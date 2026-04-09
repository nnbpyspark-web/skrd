import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temple Sevas | Book Sacred Rituals & Offerings",
  description:
    "Book sacred rituals and offerings at Sri Kanugonda Raya Swami Temple. Browse Archana, Abhishekam, Homam, Kalyanam, Annadanam and more. Book via WhatsApp.",
  keywords: [
    "temple sevas",
    "Archana booking",
    "Abhishekam",
    "Homam",
    "temple rituals Andhra Pradesh",
    "Kanugonda temple puja",
    "seva booking WhatsApp",
  ],
  openGraph: {
    title: "Temple Sevas – Sri Kanugonda Raya Swami Temple",
    description:
      "Browse and book sacred rituals: Archana, Abhishekam, Homam, Kalyanam, Annadanam. Book via WhatsApp instantly.",
    url: "https://kanugondatemple.com/sevas",
  },
};

export default function SevasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
