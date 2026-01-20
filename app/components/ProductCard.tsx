"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price:number;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-xl border-gray-600 shadow-md p-4 flex flex-col">
            <Link href={`/product-details/${product.id}`}>

      {/* Image wrapper */}
      <div className="relative h-40 w-full rounded overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.description}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-1">
        {product.description}
      </p>
      <p className="mb-1 text-sm text-gray-900 line-clamp-2">
        ₹{product.price}
      </p>
            </Link>

      <button
        onClick={() =>
          addToCart({
            id: product.id,
            title:product.title,
            description: product.description,
            thumbnail: product.thumbnail,
            price: product.price, 
          })
        }
        className="mt-auto bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
}
