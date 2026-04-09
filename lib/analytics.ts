declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const logEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
};
