"use client";

import React from "react";
import Link from "next/link";
import { User, Flower2, Lock, MessageSquareHeart, Users, Heart, Feather } from "lucide-react";
import { Button } from "@/components/ui/Button";

const modules = [
  { icon: User, label: "Identity & Profile", desc: "Who you are, in your own words." },
  { icon: Flower2, label: "Funeral Arrangements", desc: "Every detail of how you'd like to be honoured." },
  { icon: Lock, label: "Digital Vault", desc: "Your accounts, devices, and financial pointers." },
  { icon: MessageSquareHeart, label: "Final Messages", desc: "The words you've always meant to say." },
  { icon: Users, label: "Trustees", desc: "The people you trust to carry out your wishes." },
  { icon: Heart, label: "Pets & Dependants", desc: "Care instructions for those who rely on you." },
  { icon: Feather, label: "Life Philosophy", desc: "Your story, values, and legacy." },
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6 py-16">
      <div className="max-w-article w-full">
        <div className="text-center mb-12">
          <p className="font-sans text-[13px] font-medium text-ember uppercase tracking-[0.12em] mb-4">
            Welcome
          </p>
          <h1 className="font-display text-display text-stone-900 mb-6">
            <em>This is your Final Say.</em>
          </h1>
          <p className="font-sans text-body-lg text-stone-500 max-w-[560px] mx-auto leading-[1.7]">
            You&apos;re here because you care about the people you&apos;ll leave behind. Take your time. There&apos;s no rush, no deadline, no wrong answer. Every word you write here is a gift.
          </p>
        </div>

        <div className="bg-white rounded-card p-8 shadow-card mb-8">
          <h2 className="font-sans font-semibold text-[16px] text-stone-700 mb-5 uppercase tracking-[0.06em]">
            Seven sections. Complete them at your own pace.
          </h2>
          <div className="space-y-4">
            {modules.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4 py-3 border-b border-stone-100 last:border-0">
                <div className="w-9 h-9 rounded-full bg-parchment flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-dusk" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-sans font-medium text-[15px] text-stone-900">{label}</p>
                  <p className="font-sans text-[13px] text-stone-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <Button variant="primary" size="lg">
              Begin — I&apos;m ready
            </Button>
          </Link>
          <p className="font-sans text-[13px] text-stone-400 mt-4">
            You can come back and change anything at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
