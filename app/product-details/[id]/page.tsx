"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import Spinner from "../../components/Spinner";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* IMAGE SECTION */}
        <div className="bg-white border rounded-2xl p-4">
          <div className="relative w-full h-[420px] rounded-xl overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="space-y-6">
          
          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {product.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Product ID: #{product.id}
            </p>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-black">
              ₹{product.price}
            </span>
            <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  thumbnail: product.thumbnail,
                  price: product.price,
                })
              }
              className="flex-1 bg-black text-white py-3 rounded-xl font-medium
                         hover:bg-gray-800 transition active:scale-[0.98]"
            >
              Add to Cart
            </button>

            <button
              className="flex-1 border border-gray-300 py-3 rounded-xl font-medium
                         hover:bg-gray-100 transition"
            >
              Buy Now
            </button>
          </div>

          {/* DELIVERY INFO */}
          <div className="border-t pt-4 text-sm text-gray-500 space-y-1">
            <p>🚚 Free delivery on orders above ₹499</p>
            <p>🔁 7-day replacement policy</p>
            <p>💳 Secure UPI / Card payments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
