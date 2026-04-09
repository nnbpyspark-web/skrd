"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { liveConfig } from "@/data/live";
import { templeInfo } from "@/data/templeInfo";
import Link from "next/link";

function buildWhatsAppUrl(locale: "en" | "te"): string {
  const msg =
    locale === "te"
      ? "నమస్తే 🙏 శ్రీ కనుగొండ రాయస్వామి దేవాలయం: ఈరోజు దర్శన సమయాల గురించి తెలుసుకోవాలనుకుంటున్నాను."
      : "Namaste 🙏 Sri Kanugonda Raya Swami Temple: I would like to know about today's darshan timings.";
  return `https://wa.me/${templeInfo.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export default function LivePageClient() {
  const { locale } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isLive = liveConfig.isLive;
  const streamUrl = isLive && liveConfig.currentStreamId
    ? `https://www.youtube.com/embed/${liveConfig.currentStreamId}?autoplay=1&rel=0`
    : liveConfig.youtubeChannelId !== "UC_XXXXXXXXXX"
    ? `https://www.youtube.com/embed/live_stream?channel=${liveConfig.youtubeChannelId}&rel=0`
    : null;

  const whatsappUrl = buildWhatsAppUrl(locale);

  return (
    <main className="min-h-screen bg-temple-dark">
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-saffron-500 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-red-600 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          {/* Live / Offline indicator */}
          <div className="flex justify-center mb-6">
            {isLive ? (
              <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 rounded-full px-5 py-2 text-sm font-heading font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                LIVE NOW
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-ivory-400 rounded-full px-5 py-2 text-sm font-heading">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
                {locale === "te" ? "ప్రత్యక్ష ప్రసారం లేదు" : "Stream Offline"}
              </span>
            )}
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-400 via-gold-400 to-saffron-500">
              {locale === "te" ? "లైవ్ దర్శనం" : "Live Darshan"}
            </span>
          </h1>

          <p className="text-ivory-300 text-lg max-w-2xl mx-auto">
            {locale === "te"
              ? "శ్రీ కనుగొండ రాయస్వామి దేవాలయంలో ప్రత్యక్ష దర్శనాన్ని యూట్యూబ్ ద్వారా వీక్షించండి"
              : "Watch live darshan of Sri Kanugonda Raya Swami Temple via YouTube streaming"}
          </p>

          {/* Time display */}
          <div className="mt-4 text-ivory-400 font-heading text-sm">
            {currentTime.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}{" "}
            IST
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isLive && streamUrl ? (
          /* Live Stream Player */
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-900/30 border border-red-500/20">
            {/* Live badge overlay */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold font-heading shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                LIVE
              </span>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={streamUrl}
                title="Live Darshan — Sri Kanugonda Raya Swami Temple"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          /* Offline State */
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="aspect-video flex flex-col items-center justify-center text-center p-8">
              {/* Animated temple icon */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-saffron-500/20 to-gold-500/10 border border-saffron-500/30 flex items-center justify-center">
                  <span className="text-5xl">🕉</span>
                </div>
                <div className="absolute -inset-2 rounded-full border border-saffron-500/10 animate-ping" />
              </div>

              <h2 className="text-white font-heading font-bold text-2xl md:text-3xl mb-3">
                {locale === "te"
                  ? "ప్రత్యక్ష దర్శనం ప్రస్తుతం అందుబాటులో లేదు"
                  : "Live Darshan is not currently available"}
              </h2>

              <p className="text-ivory-300 max-w-md mb-6">
                {locale === "te"
                  ? "ప్రత్యక్ష ప్రసారాలకు దయచేసి షెడ్యూల్ చూడండి. మేము ముఖ్యమైన పూజలు మరియు పండుగ కార్యక్రమాలను ప్రత్యక్షంగా ప్రసారం చేస్తాము."
                  : "Please check the schedule below for upcoming live streams. We broadcast important pujas and festival events live."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://www.youtube.com/@${liveConfig.youtubeChannelId !== "UC_XXXXXXXXXX" ? "kanugondatemple" : "kanugondatemple"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-heading font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  {locale === "te" ? "యూట్యూబ్ ఛానెల్ చూడండి" : "Visit YouTube Channel"}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-heading font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {locale === "te" ? "దర్శన సమయం అడగండి" : "Ask About Darshan"}
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Live Schedule Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">
            {locale === "te" ? "లైవ్ షెడ్యూల్" : "Live Stream Schedule"}
          </h2>
          <p className="text-ivory-400">
            {locale === "te"
              ? "క్రింది సమయాల్లో ప్రత్యక్ష ప్రసారం అందుబాటులో ఉంటుంది"
              : "Live streams are available at the following times"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveConfig.schedule.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-saffron-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500/30 to-gold-500/20 flex items-center justify-center text-lg">
                  📿
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white text-sm group-hover:text-saffron-400 transition-colors">
                    {locale === "te" ? item.title.te : item.title.en}
                  </h3>
                  <span className="text-xs text-saffron-400/70">{item.day}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-ivory-300 text-sm">
                <svg className="w-4 h-4 text-saffron-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item.time}
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="mt-10 text-center bg-gradient-to-r from-saffron-900/30 to-gold-900/20 border border-saffron-500/20 rounded-2xl p-8">
          <div className="text-4xl mb-4">📺</div>
          <h3 className="font-heading font-bold text-white text-xl mb-2">
            {locale === "te" ? "నోటిఫికేషన్లు పొందండి" : "Get Notified for Live Events"}
          </h3>
          <p className="text-ivory-300 mb-6 max-w-md mx-auto">
            {locale === "te"
              ? "మా యూట్యూబ్ ఛానెల్‌ని సబ్‌స్క్రైబ్ చేయండి మరియు ప్రత్యక్ష ప్రసారాలకు బెల్ నోటిఫికేషన్ ఆన్ చేయండి."
              : "Subscribe to our YouTube channel and turn on bell notifications to never miss a live darshan."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={templeInfo.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-heading font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              {locale === "te" ? "సబ్‌స్క్రైబ్ చేయండి" : "Subscribe on YouTube"}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-saffron-500/30 text-saffron-400 hover:bg-saffron-500/10 font-heading font-semibold transition-all duration-300"
            >
              {locale === "te" ? "సంప్రదించండి" : "Contact Temple"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
