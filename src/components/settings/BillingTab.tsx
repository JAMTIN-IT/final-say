"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CreditCard, CheckCircle2 } from "lucide-react";

export function BillingTab() {
  const { userDoc } = useAuth();
  const [loading, setLoading] = useState(false);

  const plan = userDoc?.planTier ?? "none";
  const status = userDoc?.subscriptionStatus ?? "inactive";

  const planLabels: Record<string, string> = {
    essential: "Essential",
    legacy: "Legacy",
    family: "Family",
    none: "No active plan",
  };

  const planPrices: Record<string, string> = {
    essential: "$9 / month",
    legacy: "$19 / month",
    family: "$29 / month",
    none: "—",
  };

  async function handleManageBilling() {
    if (!userDoc?.stripeCustomerId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/billing-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: userDoc.stripeCustomerId }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-[480px]">
      <div className="bg-white border border-stone-300 rounded-card p-6">
        <h2 className="font-display text-[18px] text-stone-900 mb-4">Current plan</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-sans font-semibold text-[15px] text-stone-900">{planLabels[plan]}</p>
            <p className="font-sans text-[13px] text-stone-500">{planPrices[plan]}</p>
          </div>
          <span
            className={`font-sans text-[11px] font-medium px-2.5 py-1 rounded-badge ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status === "active" ? "Active" : "Inactive"}
          </span>
        </div>

        {userDoc?.stripeCustomerId ? (
          <Button variant="secondary" onClick={handleManageBilling} disabled={loading} className="w-full">
            <CreditCard size={14} className="mr-2" aria-hidden="true" />
            {loading ? "Opening portal…" : "Manage billing & invoices"}
          </Button>
        ) : (
          <Link href="/plan" className="block w-full">
            <Button variant="primary" className="w-full">Choose a plan</Button>
          </Link>
        )}
      </div>

      <div className="bg-white border border-stone-300 rounded-card p-6">
        <h2 className="font-display text-[18px] text-stone-900 mb-3">What&apos;s included</h2>
        {plan === "essential" && (
          <ul className="space-y-2">
            {["All 7 modules", "1 trustee", "End-to-end encryption", "Email support"].map((f) => (
              <li key={f} className="flex items-center gap-2 font-sans text-[13px] text-stone-700">
                <CheckCircle2 size={14} className="text-green-600 shrink-0" aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
        )}
        {plan === "legacy" && (
          <ul className="space-y-2">
            {["All 7 modules", "Up to 5 trustees", "Priority support", "PDF export", "End-to-end encryption"].map((f) => (
              <li key={f} className="flex items-center gap-2 font-sans text-[13px] text-stone-700">
                <CheckCircle2 size={14} className="text-green-600 shrink-0" aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
        )}
        {plan === "family" && (
          <ul className="space-y-2">
            {["All 7 modules", "Unlimited trustees", "Priority support", "PDF export", "Family sharing", "End-to-end encryption"].map((f) => (
              <li key={f} className="flex items-center gap-2 font-sans text-[13px] text-stone-700">
                <CheckCircle2 size={14} className="text-green-600 shrink-0" aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
        )}
        {plan === "none" && (
          <p className="font-sans text-[13px] text-stone-500">Select a plan to get started.</p>
        )}
      </div>
    </div>
  );
}
