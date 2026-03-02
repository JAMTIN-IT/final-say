"use client";

import React from "react";
import { Shield, Heart, Users } from "lucide-react";

const props = [
  {
    icon: Shield,
    title: "For you",
    body: "Peace of mind knowing your wishes are captured, secure, and will be honoured exactly as you intend.",
  },
  {
    icon: Heart,
    title: "For your family",
    body: "A single source of truth — no guesswork, no conflicts, no scrambling when it matters most.",
  },
  {
    icon: Users,
    title: "For the world",
    body: "A compassionate platform that normalises end-of-life planning and makes it an act of love.",
  },
];

export function ValueProps() {
  return (
    <section className="gradient-section py-20 px-6">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-h1 text-stone-900 mb-4">
            Why it matters
          </h2>
          <p className="font-sans text-body-lg text-stone-500 max-w-[600px] mx-auto">
            Every section you complete is one less burden for the people you love.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {props.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white rounded-card p-8 shadow-card">
              <div className="w-12 h-12 rounded-full bg-[rgba(196,112,74,0.12)] flex items-center justify-center mb-5">
                <Icon size={24} className="text-ember" aria-hidden="true" />
              </div>
              <h3 className="font-sans font-semibold text-h3 text-stone-900 mb-3">{title}</h3>
              <p className="font-sans text-body text-stone-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
