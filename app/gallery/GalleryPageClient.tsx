"use client";

import React, { useState, useCallback } from "react";
import { useLanguage, useBilingualText } from "@/lib/LanguageContext";
import { PremiumSectionHeading } from "@/components/ui/Primitives";
import { galleryItems, GalleryItem } from "@/data/gallery";

type FilterCategory = "all" | "temple" | "deity" | "festival" | "events" | "video";

export default function GalleryPageClient() {
  const { t } = useLanguage();
  const getText = useBilingualText();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : activeFilter === "video"
      ? galleryItems.filter((item) => item.type === "video")
      : galleryItems.filter(
          (item) => item.category === activeFilter && item.type === "image"
        );

  const imageItems = filteredItems.filter((item) => item.type === "image");

  const openLightbox = useCallback(
    (item: GalleryItem, index: number) => {
      setLightboxItem(item);
      setLightboxIndex(index);
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
  }, []);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      const items = filteredItems.filter((i) => i.type === "image");
      const newIndex =
        direction === "next"
          ? (lightboxIndex + 1) % items.length
          : (lightboxIndex - 1 + items.length) % items.length;
      setLightboxIndex(newIndex);
      setLightboxItem(items[newIndex]);
    },
    [filteredItems, lightboxIndex]
  );

  const filters: { key: FilterCategory; label: string }[] = [
    { key: "all", label: t.gallery.all },
    { key: "temple", label: t.gallery.temple },
    { key: "deity", label: t.gallery.deity },
    { key: "festival", label: t.gallery.festival },
    { key: "events", label: t.gallery.events },
    { key: "video", label: t.gallery.videos },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-temple-dark via-maroon-900 to-temple-darker overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold-500 blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 animate-fade-in-up">
            {t.gallery.title}
          </h1>
          <p className="text-ivory-300 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            {t.gallery.subtitle}
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 md:py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 rounded-xl font-heading font-medium text-sm transition-all duration-300 cursor-pointer ${
                  activeFilter === filter.key
                    ? "bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-lg shadow-saffron-500/20"
                    : "bg-white text-temple-dark/60 hover:text-saffron-600 border border-ivory-200 hover:border-saffron-300"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Image Grid - Masonry */}
          {activeFilter !== "video" && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {(activeFilter === "all"
                ? galleryItems.filter((i) => i.type === "image")
                : imageItems
              ).map((item, index) => (
                <div
                  key={index}
                  className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden
                    shadow-sm hover:shadow-[0_8px_40px_rgba(255,136,17,0.15)]
                    transition-all duration-500 transform hover:-translate-y-1"
                  onClick={() => openLightbox(item, index)}
                >
                  <div
                    className="w-full bg-gradient-to-br from-saffron-100 to-ivory-200 flex items-center justify-center
                      transition-transform duration-700 group-hover:scale-105"
                    style={{
                      aspectRatio: item.caption.en.length % 2 === 0 ? "3/4" : "4/3",
                    }}
                  >
                    <div className="text-center p-4">
                      <span className="text-4xl block mb-2 opacity-50">📸</span>
                      <p className="text-saffron-600/60 text-xs font-heading">
                        {getText(item.caption)}
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay with frosted glass */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex items-end
                    bg-gradient-to-t from-temple-dark/90 via-temple-dark/50 to-transparent
                    opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <p className="text-white font-heading text-sm sm:text-base font-medium">
                      {getText(item.caption)}
                    </p>
                    
                    {/* Zoom icon floating corner */}
                    <div className="absolute top-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Videos Section */}
          {(activeFilter === "all" || activeFilter === "video") && (
            <div className={activeFilter === "all" ? "mt-12" : ""}>
              {activeFilter === "all" && (
                <PremiumSectionHeading title={t.gallery.videos} />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {galleryItems
                  .filter((item) => item.type === "video")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="aspect-video bg-temple-dark">
                        {item.videoUrl && (
                          <iframe
                            src={item.videoUrl}
                            title={getText(item.caption)}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-heading font-medium text-temple-dark">
                          {getText(item.caption)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Premium Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25
              flex items-center justify-center text-white transition-all hover:rotate-90 cursor-pointer
              border border-white/20 backdrop-blur-md"
            aria-label={t.gallery.close}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full
              bg-white/10 hover:bg-white/30 flex items-center justify-center text-white
              transition-all hover:-translate-x-1 cursor-pointer border border-white/20 backdrop-blur-md"
            aria-label={t.gallery.prev}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full
              bg-white/10 hover:bg-white/30 flex items-center justify-center text-white
              transition-all hover:translate-x-1 cursor-pointer border border-white/20 backdrop-blur-md"
            aria-label={t.gallery.next}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image content */}
          <div
            className="w-full max-w-6xl max-h-[85vh] mx-auto px-16 sm:px-24 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full relative rounded-xl shadow-[0_0_80px_rgba(255,136,17,0.15)] ring-1 ring-white/20">
              <div className="aspect-[16/9] md:aspect-[3/2] w-full bg-gradient-to-br from-temple-dark to-black
                flex items-center justify-center overflow-hidden rounded-xl">
                <div className="text-center animate-pulse">
                  <span className="text-6xl block mb-4 opacity-50">📸</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm self-center">
              <p className="text-center text-ivory-100 font-serif text-lg md:text-xl tracking-wide">
                {getText(lightboxItem.caption)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
