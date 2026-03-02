"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { AlertBox } from "@/components/ui/AlertBox";
import { PageTransition } from "@/components/layout/PageTransition";
import { ShieldAlert, CheckCircle2, Clock } from "lucide-react";

export default function UnlockPage() {
  const { user, userDoc } = useAuth();
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleRequest() {
    if (!user || !userDoc) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/unlock/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          requestedBy: userDoc.displayName,
          requestedByEmail: userDoc.email,
          ownerName: userDoc.displayName,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <PageTransition>
      <div className="max-w-[560px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={32} className="text-ember" aria-hidden="true" />
          </div>
          <h1 className="font-display text-h1 text-stone-900 mb-3">Initiate Unlock</h1>
          <p className="font-sans text-body text-stone-500 leading-relaxed">
            This begins the process of unlocking your Final Say. Your trustees will each receive an email asking them to confirm.
          </p>
        </div>

        {status === "sent" ? (
          <div className="bg-green-50 border border-green-200 rounded-card p-8 text-center">
            <CheckCircle2 size={40} className="text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-display text-[22px] text-stone-900 mb-2">Request sent</h2>
            <p className="font-sans text-body-sm text-stone-500">
              Your trustees have been notified. Once enough confirmations are received, your Final Say will be unlocked.
            </p>
          </div>
        ) : (
          <>
            <AlertBox className="mb-8">
              <strong>This action sends emails to your trustees.</strong> They will be asked to confirm the unlock. This process requires a majority of trustees to approve.
            </AlertBox>

            <div className="bg-white border border-stone-300 rounded-card p-6 mb-6">
              <div className="flex items-start gap-4">
                <Clock size={20} className="text-stone-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-sans font-medium text-[14px] text-stone-900 mb-1">What happens next</p>
                  <ol className="font-sans text-[13px] text-stone-500 space-y-1 list-decimal list-inside">
                    <li>Your trustees receive a confirmation email</li>
                    <li>Each trustee clicks to confirm the unlock</li>
                    <li>Once a majority confirm, access is granted</li>
                    <li>Trustees gain access to your Final Say content</li>
                  </ol>
                </div>
              </div>
            </div>

            {status === "error" && (
              <p className="font-sans text-[13px] text-danger mb-4 text-center">
                Something went wrong. Please try again.
              </p>
            )}

            <Button
              variant="primary"
              className="w-full"
              onClick={handleRequest}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send unlock request to trustees"}
            </Button>
          </>
        )}
      </div>
    </PageTransition>
  );
}
