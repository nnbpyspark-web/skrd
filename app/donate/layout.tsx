import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | Support the Temple",
  description:
    "Support Sri Kanugonda Raya Swami Temple with your generous donation via UPI QR code, Google Pay, PhonePe, Paytm or bank transfer. Choose from General, Renovation, Annadanam, Festival funds.",
  keywords: [
    "temple donation",
    "donate temple Andhra Pradesh",
    "UPI donation Hindu temple",
    "Kanugonda temple donation",
    "annadanam sponsorship",
    "temple renovation fund",
  ],
  openGraph: {
    title: "Donate – Sri Kanugonda Raya Swami Temple",
    description:
      "Support the temple via UPI QR code, Google Pay, PhonePe or bank transfer. Your donation preserves this sacred shrine.",
    url: "https://kanugondatemple.com/donate",
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
