"use client";

import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useAutoSave } from "@/hooks/useAutoSave";
import { setDocument, getDocument } from "@/lib/firestore";
import { LifePhilosophy } from "@/types/philosophy";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { HelperText } from "@/components/ui/HelperText";
import { AutoSaveIndicator } from "@/components/ui/AutoSaveIndicator";
import { AlertBox } from "@/components/ui/AlertBox";
import { PageTransition } from "@/components/layout/PageTransition";
import { Feather } from "lucide-react";

type FormData = LifePhilosophy;

export default function PhilosophyPage() {
  const { user } = useAuth();
  const { watch, register, reset } = useForm<FormData>({ defaultValues: {} });
  const formValues = watch();

  useEffect(() => {
    if (!user) return;
    getDocument<LifePhilosophy>(`users/${user.uid}/lifePhilosophy/main`).then((doc) => {
      if (doc) reset(doc);
    });
  }, [user, reset]);

  const savePhilosophy = useCallback(async (data: FormData) => {
    if (!user) return;
    await setDocument<LifePhilosophy>(`users/${user.uid}/lifePhilosophy/main`, data);
  }, [user]);

  const saveState = useAutoSave<FormData>(formValues, savePhilosophy);

  const prompts: { field: keyof LifePhilosophy; label: string; placeholder: string; rows?: number }[] = [
    {
      field: "howToBeRemembered",
      label: "How do you want to be remembered?",
      placeholder: "Not your achievements — you as a person. What do you hope people say when they think of you?",
      rows: 5,
    },
    {
      field: "valuesToPassOn",
      label: "What values do you most want to pass on?",
      placeholder: "To your children, your community, anyone who comes after you.",
      rows: 4,
    },
    {
      field: "proudestAchievements",
      label: "What are you most proud of?",
      placeholder: "Big or small. Public or private. The things that matter to you.",
      rows: 4,
    },
    {
      field: "regrets",
      label: "Is there anything you regret — or wish you had said or done?",
      placeholder: "You don't have to share this with anyone. But writing it might bring some peace.",
      rows: 4,
    },
    {
      field: "unfinishedBusiness",
      label: "Is there anything left unfinished?",
      placeholder: "Things you wish you had done, said, or resolved.",
      rows: 4,
    },
    {
      field: "adviceForThoseLeftBehind",
      label: "What advice do you have for those you leave behind?",
      placeholder: "Practical, emotional, philosophical — whatever feels true.",
      rows: 5,
    },
    {
      field: "letterToTheWorld",
      label: "If you could leave one letter to the world, what would it say?",
      placeholder: "No audience, no filter. Just the things you know to be true.",
      rows: 8,
    },
  ];

  return (
    <PageTransition>
      <div className="max-w-article mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-parchment flex items-center justify-center">
              <Feather size={24} className="text-sage" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-h1 text-stone-900">Life Philosophy</h1>
              <p className="font-sans text-body-sm text-stone-500 italic">
                Your story, your values, your legacy.
              </p>
            </div>
          </div>
          <AutoSaveIndicator state={saveState} />
        </div>

        <AlertBox className="mb-8">
          There are no right answers here. Write freely and honestly — this section will mean the most to the people who loved you.
        </AlertBox>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {prompts.map(({ field, label, placeholder, rows = 5 }) => (
            <div key={field} className="bg-white rounded-[10px] border border-stone-300 p-7">
              <Label htmlFor={field}>{label}</Label>
              <Textarea
                id={field}
                rows={rows}
                placeholder={placeholder}
                {...register(field)}
              />
              <HelperText>This stays private until your Final Say is unlocked.</HelperText>
            </div>
          ))}
        </form>
      </div>
    </PageTransition>
  );
}
