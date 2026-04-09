"use client";

import React, { ReactNode } from "react";
import { LanguageProvider } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CookieBanner from "@/components/CookieBanner";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FestivalTicker } from "@/components/FestivalTicker";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <LanguageProvider>
      <ScrollProgress />
      <CustomCursor />
      <FestivalTicker />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFAB />
      <CookieBanner />
    </LanguageProvider>
  );
}

