import type { Metadata } from "next";
import LivePageClient from "./LivePageClient";

export const metadata: Metadata = {
  title: "Live Darshan | Sri Kanugonda Raya Swami Temple",
  description:
    "Watch live darshan of Sri Kanugonda Raya Swami Temple on YouTube. Join thousands of devotees in live streaming of morning darshan, abhishekam, aarti and special festival events.",
};

export default function LivePage() {
  return <LivePageClient />;
}
