"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroCarousel({ slides }: { slides: Array<{ id: string; title: string; subtitle: string; cta: string }> }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const active = slides[activeIndex];

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-5 pt-12 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:px-8 lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0a3f3a,#0f5f54_58%,#d97706)] p-8 text-white shadow-[0_24px_70px_-26px_rgba(10,63,58,0.7)] lg:p-12"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">Connected Campus Operations</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight lg:text-6xl">{active?.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/80">{active?.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auth/staff-login" className="rounded-full bg-white px-5 py-3 font-semibold text-slate-900">{active?.cta}</Link>
          <Link href="/portal/student" className="rounded-full border border-white/30 px-5 py-3 font-semibold text-white">Student Portal Preview</Link>
        </div>
        <div className="mt-8 flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-10 bg-white" : "w-2.5 bg-white/45"}`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
      <div className="card-surface grid gap-4 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Portals</p>
        {[
          ["Student", "Attendance, fees, marks, and leave workflow"],
          ["Teacher", "Class control, approvals, marks, and notices"],
          ["Staff", "Admissions and HR operations from one login"],
          ["Admin", "Analytics, content, governance, and configuration"]
        ].map(([title, copy]) => (
          <div key={title} className="rounded-2xl border border-black/5 bg-stone-50 p-4">
            <p className="font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-sm text-slate-600">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
