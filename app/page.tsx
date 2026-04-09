"use client";

import React from "react";
import { useLanguage, useBilingualText } from "@/lib/LanguageContext";
import { Button, SectionHeading, PremiumSectionHeading, Card, Badge } from "@/components/ui/Primitives";
import { ParticleField } from "@/components/ui/ParticleField";
import { festivals } from "@/data/festivals";
import { galleryItems } from "@/data/gallery";
import { sevas } from "@/data/sevas";

export default function HomePage() {
  const { t } = useLanguage();
  const getText = useBilingualText();

  // Get upcoming festivals (highlight ones first, then by date)
  const upcomingFestivals = [...festivals]
    .sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))
    .slice(0, 4);

  // Get first 6 gallery images
  const previewImages = galleryItems
    .filter((item) => item.type === "image")
    .slice(0, 6);

  // Get first 3 sevas
  const previewSevas = sevas.slice(0, 3);

  return (
    <>
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 1: Deep cosmic gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b
          from-[hsl(270,40%,4%)] via-[hsl(14,60%,8%)] to-[hsl(30,50%,5%)]" />

        {/* Layer 2: Centered radial amber glow */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,136,17,0.18) 0%, transparent 70%)" }} />

        {/* Layer 3: Particle field */}
        <ParticleField />

        {/* Layer 4: Mandala tiled pattern */}
        <div className="absolute inset-0 mandala-bg opacity-30" />

        {/* Large decorative Om watermark */}
        <div className="absolute text-[28vw] font-display text-saffron-500/[0.03]
          select-none pointer-events-none leading-none
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          ॐ
        </div>

        {/* Layer 5: Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-32">
          {/* Pre-heading badge */}
          <div className="animate-fade-in mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-saffron-500/30 bg-saffron-500/10 text-saffron-300
              text-xs tracking-[0.25em] uppercase font-heading">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron-400 animate-pulse" />
              Est. Ancient Times · Kanugonda, Andhra Pradesh
            </span>
          </div>

          {/* Main H1 — Cinzel Decorative + metallic gold */}
          <h1 className="animate-fade-in-up animation-delay-100 font-display font-bold leading-[1.1] mb-4">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-metallic-gold">
              Sri Kanugonda
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 mt-2">
              Raya Swami Temple
            </span>
          </h1>

          {/* Telugu subtitle */}
          <p className="animate-fade-in animation-delay-200 font-serif text-xl sm:text-2xl text-saffron-300/70 mb-6">
            శ్రీ కనుగొండ రాయ స్వామి ఆలయం
          </p>

          {/* Premium divider */}
          <div className="animate-fade-in animation-delay-300 divider-premium w-64 mx-auto my-8" />

          {/* Subtitle copy */}
          <p className="animate-fade-in-up animation-delay-300 font-serif text-ivory-300/70
            text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            A timeless sanctuary of devotion and grace, where the divine presence
            of Lord Raya Swami blesses all who seek.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up animation-delay-400
            flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/timings" variant="primary" size="lg"
              className="btn-shimmer shadow-[0_0_30px_rgba(255,136,17,0.25)]">
              🕐 View Darshan Timings
            </Button>
            <Button href="/donate" variant="outline" size="lg"
              className="border-gold-500/40 text-gold-300 hover:bg-gold-500/10">
              ❤️ Make a Donation
            </Button>
            <Button href="/sevas" variant="ghost" size="lg"
              className="text-ivory-300/70 hover:text-saffron-300">
              Book a Seva →
            </Button>
          </div>
        </div>

        {/* Cinematic bottom fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-32
          bg-gradient-to-t from-ivory-50 to-transparent" />

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border border-saffron-500/30
            flex items-start justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-saffron-400" />
          </div>
        </div>
      </section>

      {/* ═══════════ FESTIVAL HIGHLIGHTS ═══════════ */}
      <section className="py-16 md:py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumSectionHeading
            title={t.home.festivalHighlights}
            subtitle={t.home.upcomingFestivals}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingFestivals.map((festival, index) => (
              <Card key={index} className="p-6 relative overflow-hidden group">
                {festival.highlight && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="gold">✨ Highlight</Badge>
                  </div>
                )}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center text-white text-xl shadow-md">
                    🪔
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg text-temple-dark mb-2">
                  {getText(festival.name)}
                </h3>
                <p className="text-saffron-600 text-sm font-medium mb-1">
                  {new Date(festival.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-temple-dark/50 text-xs mb-3">
                  {getText(festival.duration)}
                </p>
                <p className="text-temple-dark/60 text-sm leading-relaxed line-clamp-3">
                  {getText(festival.description)}
                </p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-400 to-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT PREVIEW ═══════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-temple-dark via-maroon-900/90 to-temple-darker relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-saffron-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gold-500/5 blur-[80px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-saffron-500/20 to-gold-500/10 border border-saffron-500/20 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <span className="text-6xl mb-4 block">🏛️</span>
                  <p className="text-saffron-400/60 font-heading text-sm">Temple Image</p>
                </div>
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-saffron-400/30 rounded-tl-2xl" />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-saffron-400/30 rounded-br-2xl" />
            </div>

            {/* Right: Content */}
            <div>
              <p className="text-saffron-400 font-heading text-sm tracking-wider uppercase mb-2">
                {t.home.aboutTemple}
              </p>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-6">
                {t.home.templeName}
              </h2>
              <p className="text-ivory-300 leading-relaxed mb-8">
                {t.home.aboutPreview}
              </p>
              <Button href="/about" variant="primary">
                {t.home.readMore}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY PREVIEW ═══════════ */}
      <section className="py-16 md:py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumSectionHeading title={t.home.galleryPreview} />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {previewImages.map((item, index) => (
              <div
                key={index}
                className={`relative group rounded-2xl overflow-hidden bg-gradient-to-br from-saffron-100 to-ivory-200 cursor-pointer ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className={`${index === 0 ? "aspect-square" : "aspect-[4/3]"} flex items-center justify-center`}>
                  <div className="text-center">
                    <span className="text-4xl block mb-2">📸</span>
                    <p className="text-saffron-600/60 text-xs font-heading">{getText(item.caption)}</p>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-temple-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-heading">{getText(item.caption)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button href="/gallery" variant="primary">
              {t.home.exploreGallery}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════ SEVAS PREVIEW ═══════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-ivory-50 to-ivory-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumSectionHeading
            title={t.home.sevasTitle}
            subtitle={t.home.sevasSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewSevas.map((seva, index) => (
              <Card key={index} className="p-6 text-center group">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-saffron-100 to-gold-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  🪔
                </div>
                <h3 className="font-heading font-semibold text-lg text-temple-dark mb-2">
                  {getText(seva.name)}
                </h3>
                <p className="text-temple-dark/60 text-sm mb-4 line-clamp-2">
                  {getText(seva.description)}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-2xl font-bold gradient-text">
                    {seva.currency}{seva.price}
                  </span>
                </div>
                <p className="text-temple-dark/40 text-xs mt-1">{getText(seva.duration)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
