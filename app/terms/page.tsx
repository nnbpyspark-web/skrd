import React from "react";

export const metadata = {
  title: "Terms of Use",
  description: "Terms of use for Sri Kanugonda Raya Swami Temple.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ivory-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-temple-dark mb-8 p-4 border-b-2 border-saffron-100">
          Terms of Use
        </h1>
        <div className="prose prose-saffron max-w-none text-gray-700">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          
          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. 
          </p>

          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">2. Website Content</h2>
          <p>
            The content of the pages of this website is for your general information and use only. It is subject to change without notice. All images, text, and media related to the temple are the property of Sri Kanugonda Raya Swami Temple unless otherwise specified.
          </p>

          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">3. Donations and Sevas</h2>
          <p>
            Any donations made or sevas booked through information provided on this website are voluntary contributions to the spiritual and social causes of the temple. The temple management holds the right to utilize the funds for appropriate causes within the temple's scope.
          </p>

          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">4. Live Guidelines</h2>
          <p>
            The live darshan stream is provided for the spiritual benefit of devotees who cannot visit physically. Re-broadcasting or commercial use of the stream without prior written permission is strictly prohibited.
          </p>

          <h2 className="text-xl font-heading font-semibold text-temple-dark mt-8 mb-4">5. Governing Law</h2>
          <p>
            Your use of this website and any dispute arising out of such use is subject to the local laws of Andhra Pradesh, India.
          </p>
        </div>
      </div>
    </main>
  );
}
