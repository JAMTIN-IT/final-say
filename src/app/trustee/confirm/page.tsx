"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

export default function TrusteeConfirmPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center"><p className="font-sans text-stone-500">Loading…</p></div>}>
      <TrusteeConfirmContent />
    </Suspense>
  );
}

function TrusteeConfirmContent() {
  const params = useSearchParams();
  const requestId = params.get("requestId");
  const userId = params.get("uid");
  const trusteeId = params.get("trusteeId");

  const [status, setStatus] = useState<"idle" | "loading" | "confirmed" | "error">("idle");
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);

  async function handleConfirm() {
    if (!requestId || !userId || !trusteeId) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/unlock/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, userId, trusteeId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.message === "Already confirmed") setAlreadyConfirmed(true);
      setStatus("confirmed");
    } catch {
      setStatus("error");
    }
  }

  const isValid = requestId && userId && trusteeId;

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">
      <div className="max-w-[480px] w-full text-center">
        <div className="w-16 h-16 rounded-full bg-white shadow-card flex items-center justify-center mx-auto mb-8">
          <ShieldCheck size={32} className="text-sage" aria-hidden="true" />
        </div>

        <h1 className="font-display text-[32px] text-stone-900 mb-3">
          Final Say Unlock Confirmation
        </h1>

        {!isValid ? (
          <div className="mt-6">
            <XCircle size={40} className="text-danger mx-auto mb-4" aria-hidden="true" />
            <p className="font-sans text-body text-stone-500">
              This link is invalid or has expired. Please contact the person who invited you.
            </p>
          </div>
        ) : status === "confirmed" ? (
          <div className="mt-6">
            <CheckCircle2 size={40} className="text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-display text-[22px] text-stone-900 mb-2">
              {alreadyConfirmed ? "Already confirmed" : "Confirmation received"}
            </h2>
            <p className="font-sans text-body-sm text-stone-500 leading-relaxed">
              {alreadyConfirmed
                ? "You have already confirmed this unlock request."
                : "Thank you for confirming. Once all required trustees confirm, the Final Say will be unlocked."}
            </p>
          </div>
        ) : (
          <>
            <p className="font-sans text-body text-stone-500 leading-relaxed mb-8">
              You have been asked to confirm an unlock request. By clicking below, you are confirming that this request is legitimate and that you consent to access being granted.
            </p>

            <div className="bg-white border border-stone-300 rounded-card p-6 mb-8 text-left">
              <p className="font-sans text-[13px] text-stone-500 mb-1">This is a serious action.</p>
              <p className="font-sans text-[13px] text-stone-700 leading-relaxed">
                Only confirm if you are certain the person who submitted this request is authorised to initiate the unlock process. If you are unsure, do not confirm.
              </p>
            </div>

            {status === "error" && (
              <p className="font-sans text-[13px] text-danger mb-4">
                Something went wrong. Please try again or contact support.
              </p>
            )}

            <Button
              variant="primary"
              className="w-full"
              onClick={handleConfirm}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Confirming…" : "Confirm unlock"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
