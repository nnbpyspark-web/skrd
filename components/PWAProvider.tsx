"use client";

import { useEffect, useState, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAProvider() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [swRegistered, setSwRegistered] = useState(false);

  useEffect(() => {
    // Register Service Worker only in production, unregister in development mode to prevent stale caches
    if ("serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "development") {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister().then(() => {
              console.log("Unregistered stale service worker in dev mode");
            });
          }
        });
      } else {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((registration) => {
            console.log("SW registered:", registration.scope);
            setSwRegistered(true);
          })
          .catch((err) => {
            console.error("SW registration failed:", err);
          });
      }
    }

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if banner was dismissed recently (7 days)
    const dismissed = localStorage.getItem("pwa-banner-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // iOS detection – show manual guide
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isIOS && isSafari && !isInstalled) {
      // Show iOS-specific guide after 3 seconds
      const timer = setTimeout(() => setShowIOSGuide(true), 3000);
      return () => clearTimeout(timer);
    }

    // Android / Chrome: listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 2000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, [isInstalled]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setShowBanner(false);
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
    setShowIOSGuide(false);
    localStorage.setItem("pwa-banner-dismissed", Date.now().toString());
  }, []);

  if (isInstalled || (!showBanner && !showIOSGuide)) return null;

  return (
    <>
      {/* Android / Chrome Install Banner */}
      {showBanner && (
        <div
          role="dialog"
          aria-labelledby="install-banner-title"
          aria-describedby="install-banner-desc"
          style={{
            position: "fixed",
            bottom: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "min(calc(100vw - 2rem), 440px)",
            background: "linear-gradient(135deg, #1a0f0a 0%, #3d1a0a 100%)",
            border: "1px solid rgba(255, 136, 17, 0.3)",
            borderRadius: "1rem",
            padding: "1rem 1.25rem",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,136,17,0.1)",
            backdropFilter: "blur(12px)",
            animation: "slideUp 0.4s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
            {/* Icon */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ff8811, #cc6600)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              🕉️
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                id="install-banner-title"
                style={{
                  color: "#ffd9a8",
                  fontFamily: "var(--font-heading, Poppins, sans-serif)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  marginBottom: "0.25rem",
                }}
              >
                Install Temple App
              </p>
              <p
                id="install-banner-desc"
                style={{
                  color: "rgba(247,229,194,0.6)",
                  fontSize: "0.75rem",
                  lineHeight: 1.5,
                }}
              >
                Add to home screen for quick access to darshan timings & more
              </p>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                <button
                  onClick={handleInstall}
                  aria-label="Install the temple app on your device"
                  style={{
                    padding: "0.375rem 1rem",
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, #ff8811, #c75200)",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-heading, Poppins, sans-serif)",
                    fontWeight: 600,
                  }}
                >
                  📲 Install
                </button>
                <button
                  onClick={handleDismiss}
                  aria-label="Dismiss install prompt"
                  style={{
                    padding: "0.375rem 0.875rem",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(247,229,194,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  Later
                </button>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={handleDismiss}
              aria-label="Close install banner"
              style={{
                background: "none",
                border: "none",
                color: "rgba(247,229,194,0.4)",
                cursor: "pointer",
                padding: "4px",
                fontSize: "1rem",
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translate(-50%, 20px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
          `}</style>
        </div>
      )}

      {/* iOS Add-to-Home-Screen Guide */}
      {showIOSGuide && (
        <div
          role="dialog"
          aria-labelledby="ios-guide-title"
          style={{
            position: "fixed",
            bottom: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "min(calc(100vw - 2rem), 380px)",
            background: "linear-gradient(135deg, #1a0f0a 0%, #3d1a0a 100%)",
            border: "1px solid rgba(255, 136, 17, 0.3)",
            borderRadius: "1rem",
            padding: "1.25rem",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            animation: "slideUp 0.4s ease-out",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <p
              id="ios-guide-title"
              style={{
                color: "#ffd9a8",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              📱 Install on iPhone/iPad
            </p>
            <button
              onClick={handleDismiss}
              aria-label="Close iOS install guide"
              style={{
                background: "none",
                border: "none",
                color: "rgba(247,229,194,0.4)",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              ✕
            </button>
          </div>

          <ol
            style={{
              color: "rgba(247,229,194,0.7)",
              fontSize: "0.8rem",
              lineHeight: 1.8,
              paddingLeft: "1.25rem",
              margin: 0,
            }}
          >
            <li>Tap the <strong style={{ color: "#ff8811" }}>Share</strong> button (⬆️) at the bottom</li>
            <li>Scroll down and tap <strong style={{ color: "#ff8811" }}>&ldquo;Add to Home Screen&rdquo;</strong></li>
            <li>Tap <strong style={{ color: "#ff8811" }}>Add</strong> to confirm</li>
          </ol>

          {/* Arrow indicator */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid rgba(255, 136, 17, 0.3)",
            }}
          />

          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translate(-50%, 20px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
