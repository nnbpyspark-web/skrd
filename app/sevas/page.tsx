"use client";

import React, { useState, useCallback } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { sevas, SevaCategory } from "@/data/sevas";
import type { Seva } from "@/data/sevas";
import { templeInfo } from "@/data/templeInfo";

const WHATSAPP_NUMBER = templeInfo.whatsapp;

function buildWhatsAppUrl(seva: Seva, locale: "en" | "te"): string {
  const sevaName = seva.name[locale];
  const msg =
    locale === "te"
      ? `నమస్తే 🙏, నేను ${sevaName} సేవను బుక్ చేయాలనుకుంటున్నాను. నా పేరు ___. ఫోన్: ___. ప్రాధాన్య తేదీ: ___.`
      : `Namaste 🙏, I would like to book ${sevaName} seva. My name is ___. Phone: ___. Preferred Date: ___.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const CATEGORY_ICONS: Record<string, string> = {
  all: "🕉️",
  archana: "🌸",
  abhishekam: "🪔",
  special: "✨",
  annadanam: "🍚",
};

const CATEGORY_COLORS: Record<string, string> = {
  archana: "from-pink-500/20 to-rose-500/10 border-pink-500/30",
  abhishekam: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
  special: "from-purple-500/20 to-violet-500/10 border-purple-500/30",
  annadanam: "from-green-500/20 to-emerald-500/10 border-green-500/30",
};

const DAY_COLORS: Record<string, string> = {
  Mon: "bg-saffron-500/15 text-saffron-600",
  Tue: "bg-saffron-500/15 text-saffron-600",
  Wed: "bg-saffron-500/15 text-saffron-600",
  Thu: "bg-saffron-500/15 text-saffron-600",
  Fri: "bg-gold-500/20 text-gold-700",
  Sat: "bg-maroon-500/15 text-maroon-700",
  Sun: "bg-maroon-500/15 text-maroon-700",
};

export default function SevasPage() {
  const { t, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<SevaCategory>("all");

  const st = (t as unknown as { sevas: Record<string, string> }).sevas ?? {};

  const categories: Array<{ id: SevaCategory; label: string }> = [
    { id: "all", label: st.all ?? "All Sevas" },
    { id: "archana", label: st.archana ?? "Archana" },
    { id: "abhishekam", label: st.abhishekam ?? "Abhishekam" },
    { id: "special", label: st.special ?? "Special Pujas" },
    { id: "annadanam", label: st.annadanam ?? "Annadanam" },
  ];

  const filteredSevas =
    activeCategory === "all"
      ? sevas
      : sevas.filter((s) => s.category === activeCategory);

  const allDaysLabel = st.allDays ?? "All Days";

  const isAllDays = useCallback((days: string[]) => days.length === 7, []);

  return (
    <main className="min-h-screen bg-ivory-50">
      {/* Hero */}
      <section className="relative bg-temple-dark py-20 md:py-28 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-saffron-500 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-gold-500 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-saffron-500/10 border border-saffron-500/20 rounded-full px-4 py-1.5 text-saffron-400 text-sm font-heading mb-6">
            <span>🕉️</span>
            <span>{st.title ?? "Temple Sevas"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-400 via-gold-400 to-saffron-500">
              {st.title ?? "Temple Sevas"}
            </span>
          </h1>
          <p className="text-ivory-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {st.subtitle ?? "Book sacred rituals and offerings for divine blessings"}
          </p>

          {/* How to book CTA strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            {[
              { step: "1", text: st.ctaStep1 ?? "Choose your preferred seva" },
              { step: "2", text: st.ctaStep2 ?? 'Click "Book via WhatsApp"' },
              { step: "3", text: st.ctaStep3 ?? "Send the message with your name & date" },
              { step: "4", text: st.ctaStep4 ?? "Our priest confirms your booking" },
            ].map(({ step, text }) => (
              <div
                key={step}
                className="glass-dark rounded-xl p-3 flex items-start gap-2"
              >
                <span className="w-6 h-6 rounded-full bg-saffron-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {step}
                </span>
                <p className="text-ivory-300 text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 md:top-20 z-30 bg-ivory-50/90 backdrop-blur-md border-b border-saffron-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === id
                    ? "bg-saffron-500 text-white shadow-md shadow-saffron-500/30"
                    : "bg-white border border-saffron-200 text-temple-dark hover:border-saffron-400 hover:text-saffron-600"
                }`}
              >
                <span>{CATEGORY_ICONS[id]}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Seva Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSevas.map((seva, idx) => {
            const colorClass =
              CATEGORY_COLORS[seva.category] ??
              "from-saffron-500/20 to-gold-500/10 border-saffron-500/30";
            const whatsappUrl = buildWhatsAppUrl(seva, locale);

            return (
              <div
                key={seva.id}
                className="group flip-card h-[420px] animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="flip-card-inner w-full h-full relative shadow-sm hover:shadow-[0_12px_40px_rgba(255,136,17,0.15)] rounded-2xl">
                  
                  {/* Front Face */}
                  <article className="flip-card-front absolute inset-0 bg-white rounded-2xl border flex flex-col overflow-hidden">
                    {/* Card top gradient */}
                    <div
                      className={`h-2 shrink-0 bg-gradient-to-r ${
                        seva.category === "archana"
                          ? "from-pink-400 to-rose-500"
                          : seva.category === "abhishekam"
                          ? "from-blue-400 to-cyan-500"
                          : seva.category === "special"
                          ? "from-purple-400 to-violet-500"
                          : "from-green-400 to-emerald-500"
                      }`}
                    />

                    <div className="p-6 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-full border border-gray-100">
                            {CATEGORY_ICONS[seva.category]}
                          </span>
                          <div>
                            <h2 className="font-heading font-bold text-temple-dark text-lg leading-tight">
                              {seva.name[locale]}
                            </h2>
                            <span
                              className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${
                                seva.category === "archana"
                                  ? "bg-pink-100 text-pink-700"
                                  : seva.category === "abhishekam"
                                  ? "bg-blue-100 text-blue-700"
                                  : seva.category === "special"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {st[seva.category] ?? seva.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing Focus */}
                      <div className="mt-2 mb-6 bg-ivory-50 rounded-xl p-4 text-center border border-ivory-200">
                        <p className="text-3xl font-bold font-heading text-metallic-gold">
                          {seva.currency}{seva.price}
                        </p>
                      </div>

                      {/* Description Snippet */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {seva.description[locale]}
                      </p>

                      <div className="mt-auto text-center border-t border-gray-100 pt-4">
                        <span className="text-saffron-500 font-medium text-sm flex items-center justify-center gap-2 group-hover:text-saffron-600">
                          View Details <span className="text-lg group-hover:rotate-180 transition-transform duration-500">↻</span>
                        </span>
                      </div>
                    </div>
                  </article>

                  {/* Back Face */}
                  <article className="flip-card-back absolute inset-0 bg-temple-dark rounded-2xl border border-saffron-500/30 flex flex-col overflow-hidden">
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-gold-400 font-heading tracking-wider text-xs uppercase mb-4 text-center">
                        Seva Details
                      </h3>
                      
                      <div className="space-y-3 mb-6 flex-1 text-ivory-300">
                        {/* Duration */}
                        <div className="flex items-center gap-3 text-sm">
                          <span className="w-6 text-center text-gold-500">⏳</span>
                          <span className="font-medium text-white/50 w-20 shrink-0">{st.duration ?? "Duration"}</span>
                          <span className="text-white">{seva.duration[locale]}</span>
                        </div>
                        {/* Time Slots */}
                        <div className="flex items-start gap-3 text-sm">
                          <span className="w-6 text-center text-gold-500 pt-0.5">🕐</span>
                          <span className="font-medium text-white/50 w-20 shrink-0">{st.timeSlots ?? "Slots"}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {seva.timeSlots.map((slot) => (
                              <span key={slot} className="bg-white/10 px-2 py-0.5 rounded text-white text-xs">
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* Available Days */}
                        <div className="flex items-start gap-3 text-sm">
                          <span className="w-6 text-center text-gold-500 pt-0.5">📅</span>
                          <span className="font-medium text-white/50 w-20 shrink-0">{st.availableDays ?? "Days"}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {isAllDays(seva.availableDays) ? (
                              <span className="text-green-400 font-medium text-xs">{allDaysLabel}</span>
                            ) : (
                              seva.availableDays.map((day) => (
                                <span key={day} className="bg-saffron-500/20 text-saffron-300 px-2 py-0.5 rounded text-xs">
                                  {day}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Book Button */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white font-heading font-semibold text-sm transition-all duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.39)] group/btn btn-shimmer"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        {st.bookWhatsApp ?? "Book via WhatsApp"}
                      </a>
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-8 bg-saffron-50 border border-saffron-200 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-xl shrink-0">ℹ️</span>
          <p className="text-sm text-saffron-800 leading-relaxed">
            {st.note ?? "Note: Booking confirmation is subject to availability. Please contact the temple for specific dates."}
          </p>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-heading font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {st.anyQuestions ?? "Have Questions?"} — WhatsApp
          </a>
          <a
            href={`tel:${templeInfo.phone}`}
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-temple-dark border border-saffron-500/30 text-saffron-400 hover:bg-saffron-500/10 font-heading font-semibold transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {st.callUs ?? "Call Us"} — {templeInfo.phone}
          </a>
        </div>
      </section>
    </main>
  );
}
