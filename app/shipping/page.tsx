"use client";

import { useEffect, useState } from "react";

export default function ShippingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async load / future CMS fetch
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div
          className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"
          aria-label="Loading shipping policy"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Shipping & Return Policy</h1>
      <p className="text-gray-700">
        We offer reliable shipping options and hassle-free returns within the
        specified period.
      </p>
    </main>
  );
}
