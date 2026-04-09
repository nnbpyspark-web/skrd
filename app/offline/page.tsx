import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're Offline | Sri Kanugonda Raya Swami Temple",
  description: "You are currently offline. Please check your internet connection.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #1a0f0a 0%, #3d1a0a 50%, #0d0705 100%)",
      }}
    >
      <div className="text-center px-6 py-12 max-w-lg mx-auto">
        {/* Floating Om */}
        <div
          className="animate-float mb-8 select-none"
          aria-hidden="true"
        >
          <span
            style={{
              fontSize: "5rem",
              filter: "drop-shadow(0 0 30px rgba(255,136,17,0.5))",
            }}
          >
            🕉️
          </span>
        </div>

        {/* Temple Logo Text */}
        <h1
          className="font-heading font-bold text-3xl sm:text-4xl mb-4"
          style={{
            background: "linear-gradient(135deg, #ff8811, #d4a017, #ff6600)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Sri Kanugonda Raya Swami Temple
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div
            style={{
              height: "2px",
              width: "60px",
              background: "linear-gradient(90deg, transparent, #ff8811, transparent)",
            }}
          />
          <span style={{ color: "#ff8811", fontSize: "1.2rem" }}>✦</span>
          <div
            style={{
              height: "2px",
              width: "60px",
              background: "linear-gradient(90deg, transparent, #ff8811, transparent)",
            }}
          />
        </div>

        {/* Offline Message */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 136, 17, 0.2)",
          }}
        >
          <div className="text-4xl mb-4" aria-hidden="true">📶</div>
          <h2
            className="font-heading font-semibold text-xl mb-3"
            style={{ color: "#ffd9a8" }}
          >
            You are offline
          </h2>
          <p style={{ color: "rgba(247, 229, 194, 0.7)" }} className="leading-relaxed text-sm">
            It seems you are not connected to the internet. Some pages may still
            be available from your cache. Please check your connection and try again.
          </p>
        </div>

        {/* Cached Pages */}
        <div className="mb-8">
          <p
            className="text-sm font-heading font-medium mb-4"
            style={{ color: "#ff9e38" }}
          >
            Pages available offline:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/", label: "🏛️ Home" },
              { href: "/timings/", label: "🕐 Timings" },
              { href: "/contact/", label: "📞 Contact" },
              { href: "/about/", label: "ℹ️ About" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 rounded-full text-sm font-heading transition-all duration-300"
                style={{
                  background: "rgba(255, 136, 17, 0.1)",
                  border: "1px solid rgba(255, 136, 17, 0.3)",
                  color: "#ffd9a8",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Retry Button */}
        <a
          href="/"
          className="inline-block px-8 py-3 rounded-xl font-heading font-semibold text-white transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #ff8811, #c75200)",
            boxShadow: "0 4px 24px rgba(255, 136, 17, 0.4)",
          }}
          aria-label="Retry loading the page"
        >
          🔄 Try Again
        </a>

        {/* Prayer Quote */}
        <p
          className="mt-10 text-xs italic"
          style={{ color: "rgba(247, 229, 194, 0.4)" }}
        >
          &ldquo;Sarve Bhavantu Sukhinah — May all beings be happy&rdquo;
        </p>
      </div>
    </main>
  );
}
