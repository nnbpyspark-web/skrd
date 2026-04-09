"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { donationInfo, buildUpiLink } from "@/data/donations";
import { logEvent } from "@/lib/analytics";
import confetti from "canvas-confetti";

export default function DonatePage() {
  const { t, locale } = useLanguage();
  const dt = (t as unknown as { donate: Record<string, string> }).donate ?? {};

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedPurpose, setSelectedPurpose] = useState<string>("general");
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    // Log QR code view when donation page is loaded
    logEvent("qr_code_view", { location: "donate_page" });
  }, []);

  const effectiveAmount =
    selectedAmount ?? (customAmount ? parseInt(customAmount) : 0);

  const upiLink =
    effectiveAmount > 0
      ? buildUpiLink(
          effectiveAmount,
          donationInfo.purposes.find((p) => p.id === selectedPurpose)?.name.en
        )
      : "#";

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(donationInfo.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = donationInfo.upiId;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      document.body.removeChild(el);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  const handleUpiClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (effectiveAmount <= 0) {
      e.preventDefault();
      alert(
        locale === "te"
          ? "దయచేసి విరాళం మొత్తం ఎంచుకోండి"
          : "Please select a donation amount first"
      );
      return;
    }

    // Fire premium gold confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ffb703", "#fb8500", "#ff8a00", "#e5a910"],
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ffb703", "#fb8500", "#ff8a00", "#e5a910"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const selectedPurposeData = donationInfo.purposes.find(
    (p) => p.id === selectedPurpose
  );

  return (
    <main className="min-h-screen bg-ivory-50">
      {/* Hero */}
      <section className="relative bg-temple-dark py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-saffron-500 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 text-gold-400 text-sm font-heading mb-6">
            <span>🪔</span>
            <span>{dt.title ?? "Support the Temple"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-saffron-400 to-gold-500">
              {dt.title ?? "Support the Temple"}
            </span>
          </h1>
          <p className="text-ivory-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {dt.subtitle ??
              "Your generous contributions help preserve this sacred shrine"}
          </p>

          {/* Why donate */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              dt.reason1 ?? "Maintain daily pujas",
              dt.reason2 ?? "Support Annadanam",
              dt.reason3 ?? "Preserve architecture",
              dt.reason4 ?? "Fund festivals",
            ].map((reason, i) => (
              <div
                key={i}
                className="glass-dark rounded-xl p-3 text-center"
              >
                <p className="text-ivory-300 text-xs leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: UPI / Amount */}
          <div className="space-y-6">
            {/* Purpose Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-heading font-bold text-temple-dark mb-4 flex items-center gap-2">
                <span>🎯</span>
                {dt.purposeTitle ?? "Choose Donation Purpose"}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {donationInfo.purposes.map((purpose) => (
                  <button
                    key={purpose.id}
                    onClick={() => setSelectedPurpose(purpose.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                      selectedPurpose === purpose.id
                        ? "border-saffron-500 bg-saffron-50"
                        : "border-gray-200 hover:border-saffron-300 hover:bg-saffron-50/50"
                    }`}
                  >
                    <span className="text-2xl">{purpose.icon}</span>
                    <span className="text-sm font-heading font-semibold text-temple-dark leading-tight">
                      {purpose.name[locale]}
                    </span>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {purpose.description[locale]}
                    </p>
                  </button>
                ))}
              </div>
              {selectedPurposeData && (
                <div className="mt-3 p-3 bg-saffron-50 rounded-xl border border-saffron-200 text-sm text-saffron-800">
                  {selectedPurposeData.icon} <strong>{selectedPurposeData.name[locale]}:</strong>{" "}
                  {selectedPurposeData.description[locale]}
                </div>
              )}
            </div>

            {/* Amount Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-heading font-bold text-temple-dark mb-4 flex items-center gap-2">
                <span>💰</span>
                {dt.quickAmounts ?? "Select Donation Amount"}
              </h2>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {donationInfo.predefinedAmounts.map(({ amount, label }) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-3 rounded-xl font-heading font-bold text-base transition-all duration-200 ${
                      selectedAmount === amount
                        ? "bg-saffron-500 text-white shadow-md shadow-saffron-500/30"
                        : "bg-ivory-100 text-temple-dark border border-saffron-200 hover:border-saffron-400 hover:bg-saffron-50"
                    }`}
                  >
                    {label[locale]}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-saffron-600 font-bold text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder={dt.customAmount ?? "Enter custom amount"}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  min="1"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-400 outline-none font-heading text-temple-dark transition-colors"
                />
              </div>

              {effectiveAmount > 0 && (
                <p className="mt-2 text-sm text-saffron-600 font-medium text-center">
                  ₹{effectiveAmount.toLocaleString("en-IN")} selected
                </p>
              )}
            </div>

            {/* UPI Deep Link Buttons */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-heading font-bold text-temple-dark mb-2 flex items-center gap-2">
                <span>📱</span>
                {dt.upiTitle ?? "Donate via UPI"}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {dt.upiSubtitle ?? "Scan the QR or use UPI apps"}
              </p>

              <a
                href={effectiveAmount > 0 ? upiLink : undefined}
                onClick={handleUpiClick}
                className={`block w-full text-center py-4 px-6 rounded-xl font-heading font-bold text-lg transition-all duration-300 ${
                  effectiveAmount > 0
                    ? "bg-gradient-to-r from-saffron-500 to-gold-500 text-white shadow-md hover:shadow-xl hover:shadow-saffron-500/30 hover:scale-[1.02] active:scale-[0.98] btn-shimmer group"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span className="inline-block group-hover:scale-110 transition-transform">🪔</span> {dt.openUpiApp ?? "Open in UPI App"}
                {effectiveAmount > 0 && ` — ₹${effectiveAmount.toLocaleString("en-IN")}`}
              </a>

              <p className="text-center text-xs text-gray-400 mt-2">
                Works with Google Pay, PhonePe, Paytm, BHIM & all UPI apps
              </p>

              {/* UPI ID copy */}
              <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    {dt.upiId ?? "UPI ID"}
                  </p>
                  <p className="text-sm font-heading font-bold text-temple-dark">
                    {donationInfo.upiId}
                  </p>
                </div>
                <button
                  onClick={copyUpiId}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    copiedUpi
                      ? "bg-green-100 text-green-700"
                      : "bg-saffron-100 text-saffron-700 hover:bg-saffron-200"
                  }`}
                >
                  {copiedUpi ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {dt.copied ?? "Copied!"}
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {dt.copyUpiId ?? "Copy UPI ID"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: QR Code + Bank Details */}
          <div className="space-y-6">
            {/* QR Code */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-heading font-bold text-temple-dark mb-2 flex items-center gap-2">
                <span>📷</span>
                {dt.scanQr ?? "Scan QR Code"}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {dt.orUpiId ?? "or pay using UPI ID"}
              </p>

              <div className="flex justify-center">
                <div className="relative p-3 bg-white rounded-2xl shadow-lg border-4 border-saffron-500/20 inline-block">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-saffron-500 text-white text-xs px-3 py-1 rounded-full font-heading font-semibold">
                    🕉️ Scan to Donate
                  </div>
                  <Image
                    src={donationInfo.qrCodeImage}
                    alt="UPI QR Code for donation to Sri Kanugonda Raya Swami Temple"
                    width={260}
                    height={260}
                    className="rounded-lg"
                    priority
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">{dt.upiId ?? "UPI ID"}</p>
                <p className="text-base font-heading font-bold text-saffron-600 mt-1">
                  {donationInfo.upiId}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {donationInfo.upiName}
                </p>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-heading font-bold text-temple-dark mb-1 flex items-center gap-2">
                <span>🏦</span>
                {dt.bankTitle ?? "Bank Transfer (NEFT / RTGS)"}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {dt.bankSubtitle ?? "For large donations or corporate contributions"}
              </p>

              <div className="space-y-3">
                {[
                  {
                    label: dt.accountName ?? "Account Name",
                    value: donationInfo.bankDetails.accountName,
                    icon: "👤",
                  },
                  {
                    label: dt.accountNumber ?? "Account Number",
                    value: donationInfo.bankDetails.accountNumber,
                    icon: "🔢",
                  },
                  {
                    label: dt.ifscCode ?? "IFSC Code",
                    value: donationInfo.bankDetails.ifscCode,
                    icon: "📌",
                  },
                  {
                    label: dt.bankName ?? "Bank Name",
                    value: donationInfo.bankDetails.bankName,
                    icon: "🏛️",
                  },
                  {
                    label: dt.branch ?? "Branch",
                    value: donationInfo.bankDetails.branch,
                    icon: "📍",
                  },
                  {
                    label: dt.accountType ?? "Account Type",
                    value: donationInfo.bankDetails.accountType,
                    icon: "📂",
                  },
                ].map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between p-3 bg-ivory-50 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <span>{icon}</span>
                      <span className="text-sm text-gray-500 font-medium">
                        {label}
                      </span>
                    </div>
                    <span className="text-sm font-heading font-semibold text-temple-dark">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-gray-400 bg-gray-50 rounded-xl p-3">
                ℹ️ {dt.taxNote ?? "Tax exemption under 80G applicable. Please contact the temple for receipt."}
              </p>
            </div>
          </div>
        </div>

        {/* Thank You Section */}
        <div className="mt-10 relative overflow-hidden rounded-3xl bg-temple-dark p-8 md:p-12 text-center">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-saffron-500 via-gold-500 to-saffron-600" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 via-gold-400 to-saffron-500" />

          <div className="relative">
            <div className="text-5xl mb-4 animate-float">🙏</div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              {dt.thankYouTitle ?? "🙏 May Lord Raya Swami Bless You"}
            </h2>
            <p className="text-ivory-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
              {dt.thankYouText ??
                "Your generosity is a divine act. Every contribution helps preserve this sacred temple and serve thousands of devotees."}
            </p>
            <div className="inline-block bg-saffron-500/10 border border-saffron-500/30 rounded-full px-6 py-2">
              <p className="text-saffron-400 font-heading font-semibold text-sm tracking-wide">
                {dt.blessings ?? "ఓం నమో నారాయణాయ | Om Namo Narayanaya"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
