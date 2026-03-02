"use client";

import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useAutoSave } from "@/hooks/useAutoSave";
import { setDocument, getDocument } from "@/lib/firestore";
import { FuneralArrangements } from "@/types/funeral";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { HelperText } from "@/components/ui/HelperText";
import { AutoSaveIndicator } from "@/components/ui/AutoSaveIndicator";
import { AlertBox } from "@/components/ui/AlertBox";
import { PageTransition } from "@/components/layout/PageTransition";
import { Flower2 } from "lucide-react";

type FormData = {
  dispositionType: string;
  dispositionNotes: string;
  religiousTradition: string;
  serviceType: string;
  serviceLocation: string;
  serviceLocationAddress: string;
  eulogyDeliveredBy: string;
  flowers: string;
  musicRequests: string;
  readingRequests: string;
  obituaryDraft: string;
  receptionWishes: string;
  dressingInstructions: string;
  viewingPreference: string;
  financingNotes: string;
  additionalWishes: string;
};

export default function FuneralPage() {
  const { user } = useAuth();
  const { watch, register, reset } = useForm<FormData>({ defaultValues: {} });
  const formValues = watch();

  useEffect(() => {
    if (!user) return;
    getDocument<FuneralArrangements>(`users/${user.uid}/funeralArrangements/main`).then((doc) => {
      if (doc) {
        reset({
          dispositionType: doc.bodyDisposition?.dispositionType ?? "",
          dispositionNotes: doc.bodyDisposition?.serviceLocationPreference ?? "",
          religiousTradition: doc.bodyDisposition?.religiousTradition ?? "",
          serviceType: (doc.bodyDisposition?.serviceTypes?.[0]) ?? "",
          serviceLocation: doc.bodyDisposition?.serviceLocationPreference ?? "",
          serviceLocationAddress: doc.bodyDisposition?.preferredFuneralHome ?? "",
          eulogyDeliveredBy: doc.serviceDetails?.eulogyDeliveredBy ?? "",
          flowers: doc.serviceDetails?.flowers ?? "",
          musicRequests: (doc.serviceDetails?.musicToPlay ?? []).map((m) => m.songName).join("\n"),
          readingRequests: (doc.serviceDetails?.readings ?? []).map((r) => r.text).join("\n"),
          obituaryDraft: doc.serviceDetails?.obituaryDraft ?? "",
          receptionWishes: doc.serviceDetails?.catering ?? "",
          dressingInstructions: doc.burialPrefs?.clothingDescription ?? "",
          viewingPreference: "",
          financingNotes: doc.serviceDetails?.charitableDonations ?? "",
          additionalWishes: doc.serviceDetails?.prohibitions ?? "",
        });
      }
    });
  }, [user, reset]);

  const saveFuneral = useCallback(async (data: FormData) => {
    if (!user) return;
    const payload: FuneralArrangements = {
      bodyDisposition: {
        dispositionType: data.dispositionType as FuneralArrangements["bodyDisposition"]["dispositionType"],
        preferredFuneralHome: data.serviceLocationAddress,
        funeralHomeUrl: "",
        religiousTradition: data.religiousTradition as FuneralArrangements["bodyDisposition"]["religiousTradition"],
        customTradition: "",
        serviceTypes: data.serviceType ? [data.serviceType as FuneralArrangements["bodyDisposition"]["serviceTypes"][number]] : [],
        serviceLocationPreference: data.serviceLocation,
        preferredDateGuidance: "",
      },
      burialPrefs: {
        burialLocation: "",
        casketPreference: "",
        casketImageUrl: "",
        clothingDescription: data.dressingInstructions,
        clothingImageUrl: "",
        jewelleryInstructions: "",
        embalmingPreference: "",
      },
      cremationPrefs: {
        urnPreference: "",
        urnImageUrl: "",
        ashDisposition: [],
        scatterLocation: "",
      },
      serviceDetails: {
        musicToPlay: data.musicRequests.split("\n").filter(Boolean).map((songName) => ({ songName, moment: "during" as const })),
        musicNotToPlay: "",
        eulogyDeliveredBy: data.eulogyDeliveredBy,
        eulogyNotes: "",
        readings: data.readingRequests.split("\n").filter(Boolean).map((text) => ({ text, title: "", author: "" })),
        flowers: data.flowers,
        flowersNotWanted: "",
        dresscode: "",
        slideshowGuidance: "",
        orderOfService: "",
        catering: data.receptionWishes,
        charitableDonations: data.financingNotes,
        prohibitions: data.additionalWishes,
        obituaryDraft: data.obituaryDraft,
      },
    };
    await setDocument<FuneralArrangements>(`users/${user.uid}/funeralArrangements/main`, payload);
  }, [user]);

  const saveState = useAutoSave<FormData>(formValues, saveFuneral);

  return (
    <PageTransition>
      <div className="max-w-article mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-parchment flex items-center justify-center">
              <Flower2 size={24} className="text-ember" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-h1 text-stone-900">Funeral Arrangements</h1>
              <p className="font-sans text-body-sm text-stone-500 italic">Every detail of how you&apos;d like to be honoured.</p>
            </div>
          </div>
          <AutoSaveIndicator state={saveState} />
        </div>

        <AlertBox className="mb-8">
          There are no right or wrong answers here. Capture what feels true to you — even a few sentences is more than most people leave behind.
        </AlertBox>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="bg-white rounded-[10px] border border-stone-300 p-7 space-y-5">
            <h2 className="font-sans font-semibold text-[15px] text-stone-700 uppercase tracking-[0.06em]">Body & Disposition</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="dispositionType">What should happen to your body?</Label>
                <Select
                  id="dispositionType"
                  {...register("dispositionType")}
                  placeholder="Select an option"
                  options={[
                    { value: "burial", label: "Burial" },
                    { value: "cremation", label: "Cremation" },
                    { value: "green_burial", label: "Green / natural burial" },
                    { value: "donation", label: "Donate to science / medicine" },
                    { value: "other", label: "Other (describe below)" },
                  ]}
                />
              </div>
              <div>
                <Label htmlFor="viewingPreference">Open or closed casket?</Label>
                <Select
                  id="viewingPreference"
                  {...register("viewingPreference")}
                  placeholder="Select an option"
                  options={[
                    { value: "open", label: "Open casket" },
                    { value: "closed", label: "Closed casket" },
                    { value: "no_viewing", label: "No viewing" },
                    { value: "no_preference", label: "No preference" },
                  ]}
                />
              </div>
              <div>
                <Label htmlFor="religiousTradition">Religious or cultural tradition</Label>
                <Input id="religiousTradition" placeholder="e.g. Christian, Jewish, secular, no preference" {...register("religiousTradition")} />
              </div>
              <div>
                <Label htmlFor="dressingInstructions">Dressing instructions</Label>
                <Input id="dressingInstructions" placeholder="What should you be dressed in?" {...register("dressingInstructions")} />
              </div>
            </div>
            <div>
              <Label htmlFor="dispositionNotes">Additional notes on disposition</Label>
              <Textarea id="dispositionNotes" rows={3} placeholder="Any other wishes about your remains…" {...register("dispositionNotes")} />
            </div>
          </div>

          <div className="bg-white rounded-[10px] border border-stone-300 p-7 space-y-5">
            <h2 className="font-sans font-semibold text-[15px] text-stone-700 uppercase tracking-[0.06em]">The Service</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="serviceType">Type of service</Label>
                <Select
                  id="serviceType"
                  {...register("serviceType")}
                  placeholder="Select an option"
                  options={[
                    { value: "funeral", label: "Traditional funeral" },
                    { value: "memorial", label: "Memorial service" },
                    { value: "celebration_of_life", label: "Celebration of life" },
                    { value: "graveside", label: "Graveside only" },
                    { value: "private", label: "Private — close family only" },
                    { value: "none", label: "No service" },
                  ]}
                />
              </div>
              <div>
                <Label htmlFor="serviceLocation">Service location / venue name</Label>
                <Input id="serviceLocation" placeholder="e.g. St Mary's Church, or 'at home'" {...register("serviceLocation")} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="serviceLocationAddress">Address (if known)</Label>
                <Input id="serviceLocationAddress" placeholder="Street address, city" {...register("serviceLocationAddress")} />
              </div>
              <div>
                <Label htmlFor="eulogyDeliveredBy">Who should deliver the eulogy?</Label>
                <Input id="eulogyDeliveredBy" placeholder="Name or relationship" {...register("eulogyDeliveredBy")} />
              </div>
              <div>
                <Label htmlFor="flowers">Flower preferences</Label>
                <Input id="flowers" placeholder="e.g. white lilies, or 'no flowers'" {...register("flowers")} />
              </div>
            </div>
            <div>
              <Label htmlFor="musicRequests">Music requests</Label>
              <Textarea id="musicRequests" rows={3} placeholder="One song per line — e.g. 'Somewhere Over the Rainbow'" {...register("musicRequests")} />
              <HelperText>Enter one song or piece per line.</HelperText>
            </div>
            <div>
              <Label htmlFor="readingRequests">Readings or poems</Label>
              <Textarea id="readingRequests" rows={3} placeholder="One reading per line — title, source, or the text itself" {...register("readingRequests")} />
            </div>
            <div>
              <Label htmlFor="receptionWishes">Reception / wake wishes</Label>
              <Textarea id="receptionWishes" rows={3} placeholder="Food, location, tone — anything you'd like people to know" {...register("receptionWishes")} />
            </div>
          </div>

          <div className="bg-white rounded-[10px] border border-stone-300 p-7 space-y-5">
            <h2 className="font-sans font-semibold text-[15px] text-stone-700 uppercase tracking-[0.06em]">Your Obituary</h2>
            <div>
              <Label htmlFor="obituaryDraft">Draft obituary or memorial words</Label>
              <Textarea
                id="obituaryDraft"
                rows={8}
                placeholder="Write something — anything. It doesn't need to be perfect. Your family may use this as a starting point, or read it exactly as you wrote it."
                {...register("obituaryDraft")}
              />
              <HelperText>This stays private until your Final Say is unlocked.</HelperText>
            </div>
          </div>

          <div className="bg-white rounded-[10px] border border-stone-300 p-7 space-y-5">
            <h2 className="font-sans font-semibold text-[15px] text-stone-700 uppercase tracking-[0.06em]">Practical & Financial</h2>
            <div>
              <Label htmlFor="financingNotes">Funeral financing notes</Label>
              <Textarea id="financingNotes" rows={3} placeholder="Is there a funeral policy? A preferred funeral home? Pre-paid arrangements?" {...register("financingNotes")} />
            </div>
            <div>
              <Label htmlFor="additionalWishes">Anything else</Label>
              <Textarea id="additionalWishes" rows={4} placeholder="Anything else you want your family to know about how you'd like to be remembered or honoured." {...register("additionalWishes")} />
            </div>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
