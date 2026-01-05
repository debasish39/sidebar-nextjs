"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import Spinner from "./components/Spinner";

type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=350")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  // // 🔒 LOCK BODY SCROLL WHEN CART IS OPEN
  // useEffect(() => {
  //   if (open) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   // Cleanup (important for safety)
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [open]);

  return (
    <>
      {/* <Navbar open={open} setOpen={setOpen} /> */}

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 overflow-y-hidden"
        />
      )}

      <CartSidebar open={open} onClose={() => setOpen(false)} />

      <main className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <h2 className="text-2xl font-semibold mb-6">Products</h2>

        {loading && <Spinner />}

        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
