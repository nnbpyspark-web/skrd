import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos and videos of Sri Kanugonda Raya Swami Temple. View the temple architecture, deity, festivals, and events in our gallery.",
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
