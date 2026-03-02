"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="gradient-hero min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-ember blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-sage blur-3xl" />
      </div>
      <div className="relative max-w-content mx-auto text-center">
        <p className="font-sans text-[13px] font-medium text-ember uppercase tracking-[0.12em] mb-6">
          A private space for your final wishes
        </p>
        <h1 className="font-display text-display text-ivory mb-6 leading-[1.1]">
          <em>Leave nothing unsaid.</em>
        </h1>
        <p className="font-sans text-body-lg text-white/70 max-w-article mx-auto mb-10 leading-[1.7]">
          Final Say gives you the space to capture your wishes, your words, and your truth — so the people you love never have to guess.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button variant="primary" size="lg">
              Begin your Final Say
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="secondary" size="lg" className="border-white/40 text-white hover:bg-white/10">
              See how it works
            </Button>
          </a>
        </div>
        <p className="mt-8 font-sans text-[13px] text-white/40">
          From $1 / month · Cancel anytime · Your data stays yours
        </p>
      </div>
    </section>
  );
}
