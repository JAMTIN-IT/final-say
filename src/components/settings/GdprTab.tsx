"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { AlertBox } from "@/components/ui/AlertBox";
import { Download, Trash2 } from "lucide-react";

export function GdprTab() {
  const { user } = useAuth();
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  async function handleExport() {
    if (!user) return;
    setExporting(true);
    try {
      // Collect all user data from Firestore and download as JSON
      const token = await user.getIdToken();
      const res = await fetch(`/api/gdpr/export?uid=${user.uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `final-say-data-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExported(true);
    } catch {
      // fail silently, user can retry
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-6 max-w-[560px]">
      <div className="bg-white border border-stone-300 rounded-card p-6">
        <h2 className="font-display text-[18px] text-stone-900 mb-3">Your data rights</h2>
        <p className="font-sans text-[13px] text-stone-600 leading-relaxed mb-4">
          Under GDPR and applicable privacy law, you have the right to access, export, and erase your personal data. Final Say stores all sensitive data encrypted on your device and in Firestore under your account.
        </p>
        <ul className="space-y-2 mb-6">
          {[
            "All data is encrypted end-to-end with AES-256",
            "We never sell or share your data with third parties",
            "You can export a full copy of your data at any time",
            "You can request permanent deletion at any time",
          ].map((point) => (
            <li key={point} className="flex items-start gap-2 font-sans text-[13px] text-stone-700">
              <span className="text-sage mt-0.5">✓</span> {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2"
          >
            <Download size={14} aria-hidden="true" />
            {exporting ? "Preparing export…" : exported ? "Downloaded" : "Export my data (JSON)"}
          </Button>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-card p-6">
        <h2 className="font-display text-[18px] text-red-900 mb-2">Right to erasure</h2>
        <AlertBox className="mb-4">
          Deleting your data is <strong>permanent and irreversible</strong>. This will erase all your modules, messages, trustee relationships, and your account. This cannot be undone.
        </AlertBox>
        <Button
          variant="secondary"
          className="border-red-300 text-red-700 hover:bg-red-100 flex items-center gap-2"
          onClick={() => {
            if (confirm("Permanently delete all your data and your account? This cannot be undone.")) {
              // TODO: call delete account API endpoint
            }
          }}
        >
          <Trash2 size={14} aria-hidden="true" />
          Request data erasure
        </Button>
      </div>

      <div className="bg-white border border-stone-300 rounded-card p-6">
        <h2 className="font-display text-[18px] text-stone-900 mb-2">Privacy policy & terms</h2>
        <div className="flex gap-4">
          <a href="/privacy" className="font-sans text-[13px] text-ember underline">Privacy Policy</a>
          <a href="/terms" className="font-sans text-[13px] text-ember underline">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
