"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDocument } from "@/lib/firestore";
import { UserProfile } from "@/types/user";
import { FuneralArrangements } from "@/types/funeral";
import { ShieldCheck, User, Heart, FileText } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";

type PortalSection = "profile" | "funeral" | "messages";

export default function TrusteePortalPage() {
  const { uid } = useParams<{ uid: string }>();
  const [section, setSection] = useState<PortalSection>("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [funeral, setFuneral] = useState<FuneralArrangements | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    Promise.all([
      getDocument<UserProfile>(`users/${uid}/profile/main`),
      getDocument<FuneralArrangements>(`users/${uid}/funeralArrangements/main`),
    ]).then(([p, f]) => {
      setProfile(p);
      setFuneral(f);
      setLoading(false);
    });
  }, [uid]);

  const tabs: { key: PortalSection; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <User size={15} /> },
    { key: "funeral", label: "Funeral Arrangements", icon: <Heart size={15} /> },
    { key: "messages", label: "Messages", icon: <FileText size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <header className="bg-midnight px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-parchment" aria-hidden="true" />
          <span className="font-display text-[18px] text-parchment">Final Say — Trustee View</span>
        </div>
        <span className="font-sans text-[12px] text-stone-400 bg-stone-800 px-3 py-1 rounded-badge">
          Read-only access
        </span>
      </header>

      <div className="max-w-article mx-auto px-6 py-10">
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-[10px] p-4">
          <p className="font-sans text-[13px] text-amber-800">
            You are viewing this Final Say as a trusted person. This information is private and shared with you in confidence. Please treat it with the respect it deserves.
          </p>
        </div>

        <div className="flex gap-2 mb-8 border-b border-stone-200 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSection(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 font-sans text-[13px] font-medium border-b-2 transition-colors ${
                section === tab.key
                  ? "border-ember text-ember"
                  : "border-transparent text-stone-500 hover:text-stone-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-stone-200 rounded-[10px] animate-pulse" />
            ))}
          </div>
        ) : (
          <PageTransition>
            {section === "profile" && <ProfileSection profile={profile} />}
            {section === "funeral" && <FuneralSection funeral={funeral} />}
            {section === "messages" && <MessagesSection />}
          </PageTransition>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="py-3 border-b border-stone-100 last:border-0">
      <p className="font-sans text-[11px] text-stone-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="font-sans text-[14px] text-stone-800">{value}</p>
    </div>
  );
}

function ProfileSection({ profile }: { profile: UserProfile | null }) {
  if (!profile) return <p className="font-sans text-stone-400 italic">No profile information available.</p>;
  return (
    <div className="bg-white border border-stone-300 rounded-card p-6">
      <h2 className="font-display text-[20px] text-stone-900 mb-4">Personal Details</h2>
      <Field label="Full Legal Name" value={profile.fullLegalName} />
      <Field label="Preferred Name" value={profile.preferredName} />
      <Field label="Date of Birth" value={profile.dateOfBirth} />
      <Field label="Nationality" value={profile.nationality} />
      <Field label="Country of Residence" value={profile.countryOfResidence} />
    </div>
  );
}

function FuneralSection({ funeral }: { funeral: FuneralArrangements | null }) {
  if (!funeral) return <p className="font-sans text-stone-400 italic">No funeral arrangements recorded.</p>;
  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-300 rounded-card p-6">
        <h2 className="font-display text-[20px] text-stone-900 mb-4">Burial / Disposition</h2>
        <Field label="Disposition type" value={funeral.bodyDisposition?.dispositionType} />
        <Field label="Funeral home" value={funeral.bodyDisposition?.preferredFuneralHome} />
        <Field label="Religious tradition" value={funeral.bodyDisposition?.religiousTradition} />
      </div>
      <div className="bg-white border border-stone-300 rounded-card p-6">
        <h2 className="font-display text-[20px] text-stone-900 mb-4">Service Details</h2>
        <Field label="Eulogy by" value={funeral.serviceDetails?.eulogyDeliveredBy} />
        <Field label="Eulogy notes" value={funeral.serviceDetails?.eulogyNotes} />
        <Field label="Dress code" value={funeral.serviceDetails?.dresscode} />
        <Field label="Charitable donations" value={funeral.serviceDetails?.charitableDonations} />
      </div>
    </div>
  );
}

function MessagesSection() {
  return (
    <div className="bg-white border border-stone-300 rounded-card p-6">
      <p className="font-sans text-body-sm text-stone-500 italic">
        Messages are delivered privately to each named recipient. They are not shown here.
      </p>
    </div>
  );
}
