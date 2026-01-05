"use client";

import { useEffect, useState } from "react";

export default function FAQPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <p className="text-gray-700">
        Find answers to common questions about orders, shipping, and returns.
      </p>
    </main>
  );
}
