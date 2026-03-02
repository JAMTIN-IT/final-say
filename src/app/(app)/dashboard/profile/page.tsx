"use client";

import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useAutoSave } from "@/hooks/useAutoSave";
import { setDocument, getDocument } from "@/lib/firestore";
import { UserProfile } from "@/types/user";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { HelperText } from "@/components/ui/HelperText";
import { AutoSaveIndicator } from "@/components/ui/AutoSaveIndicator";
import { AlertBox } from "@/components/ui/AlertBox";
import { PageTransition } from "@/components/layout/PageTransition";
import { User } from "lucide-react";

const schema = z.object({
  fullLegalName: z.string().min(2, "Required"),
  preferredName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  idNumber: z.string().optional(),
  nationality: z.string().optional(),
  countryOfResidence: z.string().optional(),
  bio: z.string().optional(),
  photoURL: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const { watch, register, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const formValues = watch();

  useEffect(() => {
    if (!user) return;
    getDocument<UserProfile>(`users/${user.uid}/profile/main`).then((doc) => {
      if (doc) reset(doc);
    });
  }, [user, reset]);

  const saveProfile = useCallback(async (data: FormData) => {
    if (!user) return;
    await setDocument<UserProfile>(`users/${user.uid}/profile/main`, {
      fullLegalName: data.fullLegalName || "",
      preferredName: data.preferredName || "",
      dateOfBirth: data.dateOfBirth || "",
      idNumber: data.idNumber || "",
      nationality: data.nationality || "",
      countryOfResidence: data.countryOfResidence || "",
      bio: data.bio || "",
      photoURL: data.photoURL || "",
    });
  }, [user]);

  const saveState = useAutoSave<FormData>(formValues, saveProfile);

  return (
    <PageTransition>
      <div className="max-w-article mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-parchment flex items-center justify-center">
              <User size={24} className="text-dusk" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-h1 text-stone-900">Identity & Profile</h1>
              <p className="font-sans text-body-sm text-stone-500 italic">Tell us who you are, in your own words.</p>
            </div>
          </div>
          <AutoSaveIndicator state={saveState} />
        </div>

        <AlertBox className="mb-8">
          Your profile information is stored securely. Sensitive fields like your ID number are encrypted before saving.
        </AlertBox>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="bg-white rounded-[10px] border border-stone-300 p-7 space-y-5">
            <h2 className="font-sans font-semibold text-[15px] text-stone-700 uppercase tracking-[0.06em]">Legal Identity</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="fullLegalName">Full legal name <span className="text-danger">*</span></Label>
                <Input id="fullLegalName" placeholder="As it appears on your ID" error={!!errors.fullLegalName} {...register("fullLegalName")} />
                {errors.fullLegalName && <p className="text-danger text-[13px] mt-1">{errors.fullLegalName.message}</p>}
              </div>
              <div>
                <Label htmlFor="preferredName">Preferred name</Label>
                <Input id="preferredName" placeholder="What people call you" {...register("preferredName")} />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of birth</Label>
                <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
              </div>
              <div>
                <Label htmlFor="idNumber">ID / Passport number</Label>
                <Input id="idNumber" placeholder="Encrypted at rest" {...register("idNumber")} />
                <HelperText>This is encrypted before being saved.</HelperText>
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" placeholder="e.g. South African" {...register("nationality")} />
              </div>
              <div>
                <Label htmlFor="countryOfResidence">Country of residence</Label>
                <Input id="countryOfResidence" placeholder="e.g. South Africa" {...register("countryOfResidence")} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[10px] border border-stone-300 p-7 space-y-5">
            <h2 className="font-sans font-semibold text-[15px] text-stone-700 uppercase tracking-[0.06em]">About You</h2>
            <div>
              <Label htmlFor="bio">A short bio</Label>
              <Textarea
                id="bio"
                placeholder="Who are you, in a few sentences? Write it the way you'd introduce yourself to someone who never knew you."
                rows={5}
                {...register("bio")}
              />
              <HelperText>This may be shared with your trustees when your Final Say is unlocked.</HelperText>
            </div>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
