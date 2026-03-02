"use client";

import React from "react";

const quotes = [
  {
    quote: "I'd been putting this off for years. Final Say made it feel like a conversation, not a task. I finished my arrangements in a weekend and I feel lighter for it.",
    author: "Margaret L.",
    role: "Retired teacher, Cape Town",
  },
  {
    quote: "When my father passed, we had no idea what he wanted. Final Say means my children will never have to go through what we did.",
    author: "David K.",
    role: "Father of three, Johannesburg",
  },
  {
    quote: "The Final Messages section brought me to tears — in the best way. Being able to leave something real for the people I love is a gift I didn't know I needed to give.",
    author: "Priya N.",
    role: "Software engineer, London",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-dusk">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-h1 text-ivory mb-4">
            <em>Words from those who came back.</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {quotes.map(({ quote, author, role }) => (
            <div key={author} className="bg-white/5 border border-white/10 rounded-card p-8">
              <p className="font-display text-[18px] italic text-white/80 leading-relaxed mb-6">
                &ldquo;{quote}&rdquo;
              </p>
              <div>
                <p className="font-sans font-medium text-[14px] text-white">{author}</p>
                <p className="font-sans text-[13px] text-white/50 mt-0.5">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
