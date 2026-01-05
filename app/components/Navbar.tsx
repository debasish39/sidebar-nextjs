"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Shipping", href: "/shipping" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

export default function Navbar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { cart } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const displayCount = cartCount > 9 ? "9+" : cartCount;

  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b border-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT: LOGO */}
        <Link href="/" className="text-lg font-semibold tracking-wide">
          JSK
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-black ${
                pathname === link.href
                  ? "text-black underline underline-offset-4"
                  : "text-gray-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          
          {/* CART */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle cart"
            className="relative flex items-center justify-center w-10 h-10
                       rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <FiShoppingCart className="w-5 h-5 text-gray-800" />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white
                             text-xs px-1 min-w-[16px] h-4
                             flex items-center justify-center rounded-full">
              {displayCount}
            </span>
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-10 h-10
                       rounded-full border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            {mobileOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-white">
          <ul className="flex flex-col px-4 py-4 gap-3 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 ${
                    pathname === link.href
                      ? "text-black font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
