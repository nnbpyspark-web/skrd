"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import en from "@/locales/en.json";
import te from "@/locales/te.json";

type Locale = "en" | "te";
type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const translations: Record<Locale, Translations> = { en, te };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      document.documentElement.lang = newLocale;
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "te" : "en");
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        t: translations[locale],
        setLocale,
        toggleLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Helper to get bilingual text
export function useBilingualText() {
  const { locale } = useLanguage();
  return useCallback(
    (text: { en: string; te: string }) => text[locale],
    [locale]
  );
}
