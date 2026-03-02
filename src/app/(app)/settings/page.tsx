"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AccountTab } from "@/components/settings/AccountTab";
import { BillingTab } from "@/components/settings/BillingTab";
import { SecurityTab } from "@/components/settings/SecurityTab";
import { GdprTab } from "@/components/settings/GdprTab";
import { User, CreditCard, Shield, FileText } from "lucide-react";

type SettingsTab = "account" | "billing" | "security" | "gdpr";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as SettingsTab) ?? "account";
  const [tab, setTab] = useState<SettingsTab>(initialTab);

  const tabs: { key: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { key: "account", label: "Account", icon: <User size={15} /> },
    { key: "billing", label: "Billing", icon: <CreditCard size={15} /> },
    { key: "security", label: "Security", icon: <Shield size={15} /> },
    { key: "gdpr", label: "Data & Privacy", icon: <FileText size={15} /> },
  ];

  return (
    <PageTransition>
      <div className="max-w-article mx-auto px-6 py-10">
        <h1 className="font-display text-h1 text-stone-900 mb-8">Settings</h1>

        <div className="flex gap-1 mb-8 border-b border-stone-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 font-sans text-[13px] font-medium border-b-2 transition-colors -mb-px ${
                tab === t.key
                  ? "border-ember text-ember"
                  : "border-transparent text-stone-500 hover:text-stone-700"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {tab === "account" && <AccountTab />}
        {tab === "billing" && <BillingTab />}
        {tab === "security" && <SecurityTab />}
        {tab === "gdpr" && <GdprTab />}
      </div>
    </PageTransition>
  );
}
