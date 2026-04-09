import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the rich history, deity significance, and spiritual heritage of Sri Kanugonda Raya Swami Temple, an ancient Hindu temple in Andhra Pradesh.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
