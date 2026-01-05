"use client";

import "./globals.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import { CartProvider } from "./context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <CartProvider>
          {/* NAVBAR (visible on all pages) */}
          <Navbar open={open} setOpen={setOpen} />

          {/* OVERLAY */}
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/30 z-40"
            />
          )}

          {/* CART SIDEBAR */}
          <CartSidebar open={open} onClose={() => setOpen(false)} />

          {/* PAGE CONTENT */}
          <main className="relative z-10">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
