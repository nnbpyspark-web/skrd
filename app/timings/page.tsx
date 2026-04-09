import type { Metadata } from "next";
import TimingsPageClient from "./TimingsPageClient";

export const metadata: Metadata = {
  title: "Darshan & Timings",
  description:
    "View daily darshan timings, special puja schedule, and festival dates at Sri Kanugonda Raya Swami Temple. Check live open/closed status.",
};

export default function TimingsPage() {
  return <TimingsPageClient />;
}
