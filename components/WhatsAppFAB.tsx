"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { templeInfo } from "@/data/templeInfo";

import { logEvent } from "@/lib/analytics";

export default function WhatsAppFAB() {
  const { locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Delay appearance for polished entrance
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const message =
    locale === "te"
      ? "నమస్తే 🙏 శ్రీ కనుగొండ రాయస్వామి దేవాలయం: నేను మీతో మాట్లాడాలనుకుంటున్నాను."
      : "Namaste 🙏 Sri Kanugonda Raya Swami Temple: I would like to chat with you.";

  const whatsappUrl = `https://wa.me/${templeInfo.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
          showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-temple-dark border border-saffron-500/20 text-ivory-200 text-sm font-heading px-4 py-2.5 rounded-xl shadow-xl whitespace-nowrap">
          {locale === "te" ? "మాతో చాట్ చేయండి" : "Chat with us on WhatsApp"}
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-temple-dark border-r border-b border-saffron-500/20 rotate-45" />
        </div>
      </div>

      {/* FAB Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={locale === "te" ? "వాట్సాప్‌లో చాట్ చేయండి" : "Chat on WhatsApp"}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => logEvent("whatsapp_click", { language: locale })}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 shadow-lg hover:shadow-xl shadow-green-500/40 hover:shadow-green-400/50 transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        
        {/* WhatsApp icon */}
        <svg
          className="w-7 h-7 text-white relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
