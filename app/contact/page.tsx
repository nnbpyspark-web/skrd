import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sri Kanugonda Raya Swami Temple. Find our address, phone number, WhatsApp contact, and directions on Google Maps.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
