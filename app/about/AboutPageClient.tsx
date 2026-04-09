"use client";

import React from "react";
import { useLanguage, useBilingualText } from "@/lib/LanguageContext";
import { SectionHeading, Card } from "@/components/ui/Primitives";
import { priests } from "@/data/priests";

const timelineEvents = [
  { year: "~14th Century", title: { en: "Temple Foundation", te: "దేవాలయ స్థాపన" }, description: { en: "Temple established during the Vijayanagara Empire era", te: "విజయనగర సామ్రాజ్య కాలంలో దేవాలయం స్థాపించబడింది" } },
  { year: "~16th Century", title: { en: "Major Renovation", te: "పెద్ద పునరుద్ధరణ" }, description: { en: "Gopuram and mandapam constructed by local rulers", te: "స్థానిక పాలకులచే గోపురం మరియు మండపం నిర్మించబడింది" } },
  { year: "~18th Century", title: { en: "Cultural Revival", te: "సాంస్కృతిక పునరుజ్జీవనం" }, description: { en: "Temple became a major centre for Vedic education", te: "దేవాలయం వేద విద్య కోసం ప్రధాన కేంద్రంగా మారింది" } },
  { year: "Modern Era", title: { en: "Continued Legacy", te: "కొనసాగుతున్న వారసత్వం" }, description: { en: "Temple continues to serve thousands of devotees annually", te: "దేవాలయం ఏటా వేలాది భక్తులకు సేవ చేస్తూనే ఉంది" } },
];

export default function AboutPageClient() {
  const { t } = useLanguage();
  const getText = useBilingualText();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-temple-dark via-maroon-900 to-temple-darker overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-saffron-500 blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-gold-500 blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 animate-fade-in-up">
            {t.about.title}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4 animate-fade-in-up animation-delay-100">
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-saffron-400" />
            <span className="text-saffron-500 text-lg">🕉</span>
            <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-saffron-400" />
          </div>
        </div>
      </section>

      {/* Temple History */}
      <section className="py-16 md:py-24 bg-ivory-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.about.historyTitle} />
          <div className="prose prose-lg max-w-none">
            {t.about.historyContent.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-temple-dark/70 leading-relaxed mb-6 text-base sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Deity Significance */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-saffron-50 to-ivory-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-saffron-200 to-gold-100 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <span className="text-7xl block mb-4">🙏</span>
                  <p className="text-saffron-600/60 font-heading text-sm">Deity Image</p>
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-saffron-300/30 -z-10" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-temple-dark mb-6">
                {t.about.deityTitle}
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-saffron-400 to-gold-500 rounded-full mb-6" />
              {t.about.deityContent.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-temple-dark/70 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Priests Section */}
      <section className="py-16 md:py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.about.priestsTitle}
            subtitle={t.about.priestsSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {priests.map((priest, index) => (
              <Card key={index} className="p-8 text-center group">
                {/* Avatar */}
                <div className="relative mx-auto mb-6 w-28 h-28">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-saffron-200 to-gold-100 flex items-center justify-center text-4xl shadow-lg group-hover:shadow-saffron-300/30 transition-shadow duration-300">
                    🙏
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-saffron-400/30 scale-110" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-temple-dark mb-1">
                  {getText(priest.name)}
                </h3>
                <p className="text-saffron-600 text-sm font-medium mb-3">
                  {getText(priest.role)}
                </p>
                <p className="text-temple-dark/60 text-sm leading-relaxed">
                  {getText(priest.description)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-temple-dark via-maroon-900/90 to-temple-darker">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.about.timelineTitle}
            light
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron-400 via-gold-500 to-saffron-400" />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-saffron-400 border-4 border-temple-dark -translate-x-1/2 z-10 shadow-lg shadow-saffron-400/30" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="text-saffron-400 font-heading text-sm font-semibold tracking-wider">
                      {event.year}
                    </span>
                    <h3 className="text-white font-heading font-semibold text-lg mt-1">
                      {getText(event.title)}
                    </h3>
                    <p className="text-ivory-300/70 text-sm mt-2">
                      {getText(event.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
