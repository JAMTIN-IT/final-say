"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getDocument } from "@/lib/firestore";
import { UserProfile } from "@/types/user";
import { FuneralArrangements } from "@/types/funeral";
import { LifePhilosophy } from "@/types/philosophy";

export interface ModuleProgress {
  profile: number;
  funeral: number;
  vault: number;
  messages: number;
  trustees: number;
  dependants: number;
  philosophy: number;
  overall: number;
}

function profileCompletion(p: UserProfile | null): number {
  if (!p) return 0;
  const fields = [p.fullLegalName, p.preferredName, p.dateOfBirth, p.idNumber, p.nationality, p.countryOfResidence, p.bio];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

function funeralCompletion(f: FuneralArrangements | null): number {
  if (!f) return 0;
  const checks = [
    f.bodyDisposition?.dispositionType,
    f.bodyDisposition?.religiousTradition,
    f.serviceDetails?.eulogyDeliveredBy,
    f.serviceDetails?.flowers,
    f.serviceDetails?.obituaryDraft,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

function philosophyCompletion(p: LifePhilosophy | null): number {
  if (!p) return 0;
  const fields = [p.howToBeRemembered, p.valuesToPassOn, p.regrets, p.proudestAchievements, p.letterToTheWorld, p.adviceForThoseLeftBehind];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

export function useModuleProgress(uid: string | undefined): ModuleProgress {
  const [progress, setProgress] = useState<ModuleProgress>({
    profile: 0, funeral: 0, vault: 0, messages: 0, trustees: 0, dependants: 0, philosophy: 0, overall: 0,
  });

  useEffect(() => {
    if (!uid) return;
    async function calculate() {
      try {
        const [profileData, funeralData, philosophyData] = await Promise.all([
          getDocument<UserProfile>(`users/${uid}/profile/main`),
          getDocument<FuneralArrangements>(`users/${uid}/funeralArrangements/main`),
          getDocument<LifePhilosophy>(`users/${uid}/lifePhilosophy/main`),
        ]);
        const [vaultSnap, messagesSnap, trusteesSnap, dependantsSnap] = await Promise.all([
          getDocs(collection(db, `users/${uid}/digitalAccounts`)),
          getDocs(collection(db, `users/${uid}/messages`)),
          getDocs(collection(db, `users/${uid}/trustees`)),
          getDocs(collection(db, `users/${uid}/dependants`)),
        ]);
        const p = profileCompletion(profileData);
        const f = funeralCompletion(funeralData);
        const v = vaultSnap.size > 0 ? Math.min(100, vaultSnap.size * 20) : 0;
        const m = messagesSnap.size > 0 ? Math.min(100, messagesSnap.size * 25) : 0;
        const t = trusteesSnap.size > 0 ? 100 : 0;
        const d = dependantsSnap.size > 0 ? 100 : 0;
        const ph = philosophyCompletion(philosophyData);
        const overall = Math.round((p + f + v + m + t + d + ph) / 7);
        setProgress({ profile: p, funeral: f, vault: v, messages: m, trustees: t, dependants: d, philosophy: ph, overall });
      } catch (err) {
        console.error("useModuleProgress error:", err);
      }
    }
    calculate();
  }, [uid]);

  return progress;
}
