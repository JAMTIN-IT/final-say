"use client";

import React from "react";

const steps = [
  {
    number: "01",
    title: "Capture your wishes",
    body: "Work through seven guided modules at your own pace. Profile, funeral arrangements, digital vault, final messages, and more. Auto-saved as you go.",
  },
  {
    number: "02",
    title: "Designate your trustees",
    body: "Choose the people you trust to carry out your wishes. They receive an invitation but can't access anything until the time comes.",
  },
  {
    number: "03",
    title: "Rest easy",
    body: "Your information is encrypted and secure. When the time comes, your trustees gain scoped access and your family has exactly what they need.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-white">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-h1 text-stone-900 mb-4">How it works</h2>
          <p className="font-sans text-body-lg text-stone-500 max-w-[560px] mx-auto">
            Simple, unhurried, and designed around you.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map(({ number, title, body }) => (
            <div key={number} className="flex flex-col">
              <span className="font-display text-[4rem] font-light text-stone-100 leading-none mb-4 select-none" aria-hidden="true">
                {number}
              </span>
              <h3 className="font-sans font-semibold text-h3 text-stone-900 mb-3">{title}</h3>
              <p className="font-sans text-body text-stone-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
