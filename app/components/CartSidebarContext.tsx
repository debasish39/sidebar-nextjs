"use client";

import {
  FiX,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiShoppingCart,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function CartSidebarContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const { cart, increaseQty, decreaseQty, removeItem, totalPrice } = useCart();
  const router=useRouter();
 const handleCheckout=()=>{
  if(cart.length==0) return;
  onClose();
  router.push("/checkout");
 }
  return (
   <aside className="fixed right-0 top-0 z-50 h-screen w-[340px] bg-white/90 shadow-2xl border-l border-gray-200 flex flex-col overflow-x-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FiShoppingCart />
          <span>Your Cart</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Close cart"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* ITEMS */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {cart.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-10">
            Your cart is empty
          </p>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 border border-gray-200 rounded-xl p-3 hover:shadow-sm transition"
          >
            {/* IMAGE */}
            <div className="relative h-16 w-16 rounded-lg overflow-hidden border bg-gray-100">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            {/* INFO */}
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-1">
                {item.title}
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                ₹{item.price}
              </p>

              {/* QTY CONTROLS */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="h-7 w-7 flex items-center justify-center rounded-md border hover:bg-gray-100 transition"
                >
                  <FiMinus size={12} />
                </button>

                <span className="w-6 text-center text-sm font-medium">
                  {item.qty}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="h-7 w-7 flex items-center justify-center rounded-md border hover:bg-gray-100 transition"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeItem(item.id)}
              className="self-start p-2 rounded-full text-red-500 hover:bg-red-50 transition"
              aria-label="Remove item"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="border-t px-4 py-4">
        <div className="flex justify-between text-sm font-medium">
          <span>Total</span>
          <span>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(totalPrice)}
          </span>
        </div>

   <button
  onClick={handleCheckout}
  disabled={cart.length === 0}
  className={`mt-3 w-full py-3 rounded-xl font-medium transition
    ${
      cart.length === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-black text-white hover:bg-gray-800"
    }`}
>
  Checkout
</button>


      </div>
    </aside>
  );
}
