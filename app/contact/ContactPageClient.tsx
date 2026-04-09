"use client";

import React from "react";
import { useLanguage, useBilingualText } from "@/lib/LanguageContext";
import { Button, Card } from "@/components/ui/Primitives";
import { templeInfo } from "@/data/templeInfo";
import { dailyTimings } from "@/data/timings";

export default function ContactPageClient() {
  const { t, locale } = useLanguage();
  const getText = useBilingualText();

  const whatsappUrl = `https://wa.me/${templeInfo.whatsapp}?text=${encodeURIComponent(
    getText(templeInfo.whatsappMessage)
  )}`;

  const mapsDirectionUrl = `https://www.google.com/maps/dir/?api=1&destination=${templeInfo.mapCoordinates.lat},${templeInfo.mapCoordinates.lng}`;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-temple-dark via-maroon-900 to-temple-darker overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-60 h-60 rounded-full bg-saffron-500 blur-[100px]" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-gold-500 blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 animate-fade-in-up">
            {t.contact.title}
          </h1>
          <p className="text-ivory-300 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Contact Details */}
            <div className="space-y-6">
              {/* Address Card */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-100 to-gold-100 flex items-center justify-center text-xl shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-temple-dark text-lg mb-2">
                      {t.contact.address}
                    </h3>
                    <p className="text-temple-dark/70 leading-relaxed">
                      {getText(templeInfo.address)}
                    </p>
                    <a
                      href={mapsDirectionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-saffron-600 hover:text-saffron-700 font-medium text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      {t.contact.getDirections}
                    </a>
                  </div>
                </div>
              </Card>

              {/* Phone Card */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-xl shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-temple-dark text-lg mb-2">
                      {t.contact.phone}
                    </h3>
                    <a
                      href={`tel:${templeInfo.phone}`}
                      className="text-temple-dark/70 text-lg hover:text-saffron-600 transition-colors"
                    >
                      {templeInfo.phone}
                    </a>
                    <div className="mt-3">
                      <Button
                        href={`tel:${templeInfo.phone}`}
                        variant="primary"
                        size="sm"
                        external
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {t.contact.callNow}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Email Card */}
              <Card className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center text-xl shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-temple-dark text-lg mb-2">
                      {t.contact.email}
                    </h3>
                    <a
                      href={`mailto:${templeInfo.email}`}
                      className="text-temple-dark/70 hover:text-saffron-600 transition-colors"
                    >
                      {templeInfo.email}
                    </a>
                  </div>
                </div>
              </Card>

              {/* WhatsApp Card */}
              <Card className="p-6 sm:p-8 bg-green-50 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-200 to-green-100 flex items-center justify-center text-xl shrink-0">
                    💬
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-temple-dark text-lg mb-2">
                      {t.contact.whatsapp}
                    </h3>
                    <p className="text-temple-dark/60 text-sm mb-3">
                      {t.contact.whatsappCta}
                    </p>
                    <Button
                      href={whatsappUrl}
                      variant="whatsapp"
                      size="md"
                      external
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {t.contact.whatsapp}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Visiting Hours */}
              <Card className="p-6 sm:p-8">
                <h3 className="font-heading font-semibold text-temple-dark text-lg mb-4 flex items-center gap-2">
                  🕐 {t.contact.visitingHours}
                </h3>
                <div className="space-y-3">
                  {dailyTimings
                    .filter((t) => !t.title.en.toLowerCase().includes("closed"))
                    .map((timing, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-ivory-100 last:border-0"
                      >
                        <span className="text-temple-dark/70 text-sm">
                          {getText(timing.title)}
                        </span>
                        <span className="text-saffron-600 font-medium text-sm">
                          {timing.startTime} - {timing.endTime}
                        </span>
                      </div>
                    ))}
                </div>
              </Card>
            </div>

            {/* Right: Google Maps */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="overflow-hidden" hover={false}>
                <div className="p-6 bg-gradient-to-r from-saffron-500 to-saffron-600">
                  <h3 className="font-heading font-semibold text-white text-lg flex items-center gap-2">
                    📍 {t.contact.locationTitle}
                  </h3>
                </div>
                <div className="aspect-[4/3] sm:aspect-[16/10]">
                  <iframe
                    src={templeInfo.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Temple Location"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 bg-ivory-50">
                  <a
                    href={mapsDirectionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-heading font-semibold text-sm hover:from-saffron-600 hover:to-saffron-700 transition-all duration-300 shadow-lg hover:shadow-saffron-500/25"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    {t.contact.getDirections}
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
