"use client";

import Link from "next/link";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-black/5 bg-[#fbf8f2]/90 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand)] text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold tracking-[0.18em] text-[11px] uppercase text-[var(--accent)]">Lotus Valley</p>
            <p className="font-semibold text-slate-900">Lotus Valley School</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/about">About</Link>
          <Link href="/academics">Academics</Link>
          <Link href="/admissions">Admissions</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login" className="rounded-full border border-black/10 px-4 py-2">Portal Login</Link>
          <Link href="/auth/staff-login" className="rounded-full border border-black/10 px-4 py-2">Staff Login</Link>
          <Link href="/auth/admin-login" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white">
            <ShieldCheck className="h-4 w-4" />
            Admin Login
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
