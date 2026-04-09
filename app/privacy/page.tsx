import React from "react";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Sri Kanugonda Raya Swami Temple.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-temple-dark mb-8 p-4 border-b-2 border-saffron-100">
          Privacy Policy
        </h1>
        <div className="prose prose-saffron max-w-none text-gray-700">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          
          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to the official website of Sri Kanugonda Raya Swami Temple. We respect your privacy and are committed to protecting your personal data.
          </p>

          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">2. Information We Collect</h2>
          <p>
            We may collect contact information (such as name, email, or phone number) when you intentionally reach out to us through the provided contact details or WhatsApp integration. We also use analytics tools (like Google Analytics) to collect anonymized usage data to improve our website experience.
          </p>

          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">3. Use of Cookies</h2>
          <p>
            Our website uses cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">4. How We Use Your Information</h2>
          <p>
            We use the information we collect to maintain our website, understand how visitors interact with our content, and communicate with you upon your request.
          </p>

          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">5. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party services like WhatsApp and YouTube. We are not responsible for the privacy practices or the content of these third-party services.
          </p>

          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via the details provided on our contact page.
          </p>
        </div>
      </div>
    </main>
  );
}
