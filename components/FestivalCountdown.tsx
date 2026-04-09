"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { festivals, type Festival } from "@/data/festivals";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type FestivalWithDate = Festival & { dateObj: Date };

function getNextFestival(): FestivalWithDate | null {
  const now = new Date();
  const upcoming = festivals
    .map((f) => ({ ...f, dateObj: new Date(f.date) }))
    .filter((f) => f.dateObj > now)
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  return upcoming[0] ?? null;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function FestivalCountdown() {
  const { locale } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [festival, setFestival] = useState<FestivalWithDate | null>(null);

  useEffect(() => {
    const next = getNextFestival();
    setFestival(next);
    if (!next) return;

    const target = new Date(next.date);
    setTimeLeft(calculateTimeLeft(target));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!festival || !timeLeft) return null;

  const festivalName = locale === "te" ? festival.name.te : festival.name.en;
  const festivalDate = new Date(festival.date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const labels =
    locale === "te"
      ? { days: "రోజులు", hours: "గంటలు", minutes: "నిమిషాలు", seconds: "సెకన్లు", next: "తదుపరి పండుగ", on: "తేదీ" }
      : { days: "Days", hours: "Hours", minutes: "Mins", seconds: "Secs", next: "Next Festival", on: "on" };

  return (
    <div className="bg-gradient-to-br from-saffron-600/10 to-gold-600/10 border border-saffron-500/20 rounded-2xl p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🪔</span>
        <div>
          <p className="text-saffron-400 text-xs font-heading uppercase tracking-wider">
            {labels.next}
          </p>
          <h3 className="font-heading font-bold text-white text-lg leading-tight">
            {festivalName}
          </h3>
          <p className="text-ivory-400 text-xs mt-0.5">
            {labels.on} {festivalDate}
          </p>
        </div>
      </div>

      {/* Countdown Boxes */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { value: timeLeft.days, label: labels.days },
          { value: timeLeft.hours, label: labels.hours },
          { value: timeLeft.minutes, label: labels.minutes },
          { value: timeLeft.seconds, label: labels.seconds },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center bg-black/20 border border-white/10 rounded-xl py-3 px-2"
          >
            <span className="text-2xl md:text-3xl font-bold font-heading text-saffron-400 tabular-nums">
              {pad(value)}
            </span>
            <span className="text-ivory-400 text-[10px] font-heading uppercase tracking-wider mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Festival description */}
      {festival.highlight && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-400 text-xs font-heading">
            {locale === "te" ? "ముఖ్యమైన వేడుక" : "Highlight Festival"}
          </span>
        </div>
      )}
    </div>
  );
}
