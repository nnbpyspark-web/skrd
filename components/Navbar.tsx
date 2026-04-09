"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { liveConfig } from "@/data/live";
import { logEvent } from "@/lib/analytics";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, locale, toggleLocale } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/timings", label: t.nav.timings },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/sevas", label: (t.nav as Record<string, string>).sevas ?? "Sevas" },
    { href: "/live", label: locale === "te" ? "లైవ్ దర్శనం" : "Live Darshan", isLive: true },
    { href: "/donate", label: (t.nav as Record<string, string>).donate ?? "Donate", highlight: true },
    { href: "/contact", label: t.nav.contact },
  ] as { href: string; label: string; highlight?: boolean; isLive?: boolean }[];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-temple-dark/95 backdrop-blur-md shadow-lg shadow-saffron-900/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg group-hover:shadow-saffron-500/30 transition-all duration-300">
                🕉
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-heading font-bold text-sm md:text-base leading-tight">
                  Sri Kanugonda
                </p>
                <p className="text-saffron-400 text-xs md:text-sm font-heading">
                  Raya Swami Temple
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium font-heading transition-all duration-300 ${
                    link.highlight
                      ? isActive(link.href)
                        ? "text-white bg-gold-500"
                        : "text-gold-400 border border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-300"
                      : isActive(link.href)
                      ? "text-saffron-400 bg-saffron-500/10"
                      : "text-ivory-200 hover:text-saffron-300 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {link.isLive && liveConfig.isLive && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right side: Language toggle + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => {
                  toggleLocale();
                  logEvent("language_toggle", { new_language: locale === "en" ? "te" : "en" });
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-saffron-500/30 text-saffron-300 hover:bg-saffron-500/10 hover:border-saffron-400/50 transition-all duration-300 text-sm font-heading"
                aria-label="Toggle language"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span>{locale === "en" ? "తెలు" : "EN"}</span>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-6 h-0.5 bg-saffron-400 transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-saffron-400 transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-saffron-400 transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-temple-dark shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <div className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-base font-heading transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-saffron-400 bg-saffron-500/15 font-semibold"
                    : "text-ivory-200 hover:text-saffron-300 hover:bg-white/5"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.label}
                {link.isLive && liveConfig.isLive && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                )}
                {link.isLive && liveConfig.isLive && (
                  <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded-full font-bold">LIVE</span>
                )}
              </Link>
            ))}
          </div>

          {/* Decorative divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-saffron-500/30 to-transparent" />

          {/* Temple name in mobile */}
          <div className="text-center">
            <p className="text-saffron-400 font-heading text-sm">🕉 Sri Kanugonda</p>
            <p className="text-ivory-300 text-xs mt-1">Raya Swami Temple</p>
          </div>
        </div>
      </div>
    </>
  );
}
