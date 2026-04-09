"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { festivals } from "@/data/festivals";

export function FestivalTicker() {
  const { locale } = useLanguage();

  const items = festivals.map(f => {
    const name = locale === "te" ? f.name.te : f.name.en;
    const date = new Date(f.date).toLocaleDateString("en-IN", {
      day: "numeric", month: "short",
    });
    return `${name} — ${date}`;
  });

  const content = [...items, ...items].join("  ✦  ");

  return (
    <div className="h-9 overflow-hidden flex items-center
      bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900
      border-b border-saffron-900/30">
      <div className="flex whitespace-nowrap"
        style={{ animation: "ticker-scroll 40s linear infinite" }}>
        <span className="text-gold-300 text-xs font-heading tracking-wider px-4">
          🪔 {content}
        </span>
        <span className="text-gold-300 text-xs font-heading tracking-wider px-4"
          aria-hidden>
          🪔 {content}
        </span>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .h-9:hover div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
