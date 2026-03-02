"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { PLANS, PlanKey } from "@/lib/stripe";

export default function PlanPage() {
  const searchParams = useSearchParams();
  const defaultPlan = (searchParams.get("selected") || "legacy") as PlanKey;
  const [selected, setSelected] = useState<PlanKey>(defaultPlan);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function handleCheckout() {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selected, userId: user.uid, email: user.email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  const planOrder: PlanKey[] = ["essential", "legacy", "family"];

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-content w-full">
        <div className="text-center mb-12">
          <h1 className="font-display text-h1 text-stone-900 mb-3">Choose your plan</h1>
          <p className="font-sans text-body-lg text-stone-500">
            Everything you need from $1 a month. Change plans anytime.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto mb-10">
          {planOrder.map((key) => {
            const plan = PLANS[key];
            const isSelected = selected === key;
            return (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`text-left rounded-card p-7 transition-all duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${
                  isSelected
                    ? "bg-dusk text-white ring-2 ring-ember shadow-modal"
                    : "bg-white shadow-card hover:shadow-card-hover"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-sans font-semibold text-[18px] ${isSelected ? "text-white" : "text-stone-900"}`}>
                    {plan.name}
                  </h3>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-ember bg-ember" : "border-stone-300"}`}>
                    {isSelected && <Check size={11} className="text-white" aria-hidden="true" />}
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`font-display text-[2.2rem] font-light ${isSelected ? "text-ivory" : "text-stone-900"}`}>
                    ${(plan.priceUSD / 100).toFixed(0)}
                  </span>
                  <span className={`font-sans text-body-sm ${isSelected ? "text-white/60" : "text-stone-500"}`}>/month</span>
                </div>
                <p className={`font-sans text-body-sm mb-5 ${isSelected ? "text-white/70" : "text-stone-500"}`}>{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={14} className={`shrink-0 mt-0.5 ${isSelected ? "text-sage" : "text-sage"}`} aria-hidden="true" />
                      <span className={`font-sans text-[13px] ${isSelected ? "text-white/80" : "text-stone-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Button variant="primary" size="lg" onClick={handleCheckout} loading={loading}>
            Continue with {PLANS[selected].name} — ${(PLANS[selected].priceUSD / 100).toFixed(0)}/month
          </Button>
        </div>
        <p className="text-center font-sans text-[13px] text-stone-500 mt-4">
          Secure checkout via Stripe · Cancel anytime
        </p>
      </div>
    </div>
  );
}
