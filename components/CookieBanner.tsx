"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/Primitives";

export default function CookieBanner() {
  const [showConsent, setShowConsent] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    // Check if consent was already given/saved
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShowConsent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowConsent(false);
    
    // Attempt to update GA consent state if implemented
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-temple-dark border-t border-saffron-500/20 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-ivory-300">
          {locale === "te"
            ? "మేము మీ అనుభవాన్ని మెరుగుపరచడానికి కుక్కీలను ఉపయోగిస్తాము. కుక్కీలను అంగీకరించడం ద్వారా మీరు వాటి ఉపయోగానికి అంగీకరిస్తున్నారు."
            : "We use cookies and analytics to enhance your experience. By continuing to visit this site you agree to our use of cookies."}
          {" "}
          <a href="/privacy" className="text-saffron-400 hover:text-saffron-300 underline underline-offset-2">
            {locale === "te" ? "మరింత తెలుసుకోండి" : "Learn more"}
          </a>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={declineCookies} className="text-xs">
            {locale === "te" ? "తిరస్కరించండి" : "Decline"}
          </Button>
          <Button variant="primary" size="sm" onClick={acceptCookies} className="text-xs">
            {locale === "te" ? "అంగీకరించండి" : "Accept"}
          </Button>
        </div>
      </div>
    </div>
  );
}
