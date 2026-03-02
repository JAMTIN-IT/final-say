"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/stripe";
import { Button } from "@/components/ui/Button";

export function Pricing() {
  const plans = [
    { key: "essential" as const, highlighted: false },
    { key: "legacy" as const, highlighted: true },
    { key: "family" as const, highlighted: false },
  ];

  return (
    <section className="py-20 px-6 gradient-section">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-h1 text-stone-900 mb-4">Simple, honest pricing</h2>
          <p className="font-sans text-body-lg text-stone-500 max-w-[520px] mx-auto">
            From $1 a month. Cancel anytime. Your data is always yours.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {plans.map(({ key, highlighted }) => {
            const plan = PLANS[key];
            const priceDisplay = `$${(plan.priceUSD / 100).toFixed(0)}`;
            return (
              <div
                key={key}
                className={`rounded-card p-8 flex flex-col ${
                  highlighted
                    ? "bg-dusk text-white shadow-modal ring-2 ring-ember"
                    : "bg-white shadow-card"
                }`}
              >
                <div className="mb-6">
                  <h3 className={`font-sans font-semibold text-h3 mb-1 ${highlighted ? "text-white" : "text-stone-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`font-sans text-body-sm mb-4 ${highlighted ? "text-white/70" : "text-stone-500"}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-display text-[2.5rem] font-light ${highlighted ? "text-ivory" : "text-stone-900"}`}>
                      {priceDisplay}
                    </span>
                    <span className={`font-sans text-body-sm ${highlighted ? "text-white/60" : "text-stone-500"}`}>/month</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={16} className={`shrink-0 mt-0.5 ${highlighted ? "text-sage" : "text-sage"}`} aria-hidden="true" />
                      <span className={`font-sans text-body-sm ${highlighted ? "text-white/80" : "text-stone-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href={`/sign-up?plan=${key}`}>
                  <Button
                    variant={highlighted ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Get started
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
        <p className="text-center font-sans text-[13px] text-stone-500 mt-8">
          Billing in ZAR available · R20 / R60 / R100 per month
        </p>
      </div>
    </section>
  );
}
