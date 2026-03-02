"use client";

import React from "react";
import { User, Flower2, Lock, MessageSquareHeart, Users, Heart, Feather } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useModuleProgress } from "@/hooks/useModuleProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PageTransition } from "@/components/layout/PageTransition";
import { ModuleCard } from "@/components/dashboard/ModuleCard";

const modules = [
  { key: "profile" as const, label: "Profile", icon: User, href: "/dashboard/profile", iconColor: "#2C2A4A" },
  { key: "funeral" as const, label: "Funeral Arrangements", icon: Flower2, href: "/dashboard/funeral", iconColor: "#C4704A" },
  { key: "vault" as const, label: "Digital Vault", icon: Lock, href: "/dashboard/vault", iconColor: "#2C2A4A" },
  { key: "messages" as const, label: "Final Messages", icon: MessageSquareHeart, href: "/dashboard/messages", iconColor: "#C4704A" },
  { key: "trustees" as const, label: "Trustees", icon: Users, href: "/dashboard/trustees", iconColor: "#7A9E8E" },
  { key: "dependants" as const, label: "Pets & Dependants", icon: Heart, href: "/dashboard/dependants", iconColor: "#C4704A" },
  { key: "philosophy" as const, label: "Life Philosophy", icon: Feather, href: "/dashboard/philosophy", iconColor: "#7A9E8E" },
];

export default function DashboardPage() {
  const { user, userDoc } = useAuth();
  const progress = useModuleProgress(user?.uid);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const name = userDoc?.displayName?.split(" ")[0] || "there";

  return (
    <PageTransition>
      <div className="max-w-content mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="font-display text-h1 text-stone-900 mb-1">
            {greeting}, {name}.
          </h1>
          <p className="font-sans text-body text-stone-500 mb-6 italic font-display">
            Your Final Say is {progress.overall}% complete.
          </p>
          <div className="max-w-[480px]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[13px] text-stone-500">Overall progress</span>
              <span className="font-sans font-medium text-[13px] text-stone-700">{progress.overall}%</span>
            </div>
            <ProgressBar percentage={progress.overall} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map(({ key, label, icon, href, iconColor }) => (
            <ModuleCard
              key={key}
              label={label}
              icon={icon}
              iconColor={iconColor}
              href={href}
              percentage={progress[key]}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
