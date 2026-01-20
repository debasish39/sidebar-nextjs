"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();
  const [upiId, setUpiId] = useState("sonupanda0999-1@okhdfcbank");
  const [showUpi, setShowUpi] = useState(false);
const maskUpi = (upi) => {
  const [name, bank] = upi.split("@");
  console.log(name,bank)
  return `${name.slice(0, 2)}******@${bank}`;
};

  // 🔗 UPI INTENT URL
  const upiUrl = `upi://pay?pa=${upiId}&pn=JSK Store&am=${totalPrice}&cu=INR&tn=Order Payment`;

  // 📸 QR CODE IMAGE URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    upiUrl
  )}`;

  const handleUpiPay = () => {
    if (!upiId.includes("@")) {
      alert("Enter a valid UPI ID");
      return;
    }
    window.location.href = upiUrl;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="font-medium">Order Summary</h2>
            </div>

            <div className="divide-y">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 px-6 py-5">
                  {/* IMAGE */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border bg-gray-100 ">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price} × {item.qty}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="font-semibold text-sm">
                    ₹{item.price * item.qty}
                  </div>
                </div>
              ))}
              
            </div>
            
          </div>
             {/* PRICE DETAILS */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
            <h2 className="font-medium">Price Details</h2>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 lg:sticky lg:top-8 h-fit">
          {/* Spacer for alignment with left title */}
          <div className="hidden lg:block h-10" />

       

          {/* ADDRESS */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
            <h2 className="font-medium">Delivery Address</h2>

            <input
              className="border w-full px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
              placeholder="Full Name"
            />
            <input
              className="border w-full px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none"
              placeholder="Mobile Number"
            />
            <textarea
              className="border w-full px-3 py-2.5 rounded-lg text-sm resize-none focus:ring-2 focus:ring-black outline-none"
              rows={3}
              placeholder="Complete Address"
            />
          </div>
          {/* UPI PAYMENT */}
          <div className="bg-white border rounded-2xl p-6 space-y-4">
            <h2 className="font-medium text-lg">Pay via UPI</h2>

            {/* UPI ID INPUT */}
       <div className="space-y-1">
  <div className="flex items-center justify-between">
    <label className="text-sm font-medium">UPI ID</label>
    <button
      type="button"
      onClick={() => setShowUpi(!showUpi)}
      className="text-sm text-blue-600 hover:underline"
    >
      {showUpi ? "Hide" : "Show"}
    </button>
  </div>

  {/* UPI FIELD */}
  <input
    value={showUpi ? upiId : maskUpi(upiId)}
    readOnly
    onCopy={(e) => !showUpi && e.preventDefault()}
    onCut={(e) => e.preventDefault()}
    className="border w-full px-3 py-2.5 rounded-lg text-sm
               bg-gray-100 font-mono cursor-default select-none"
  />

  {!showUpi && (
    <p className="text-xs text-gray-500">
      UPI ID hidden for security
    </p>
  )}
</div>


            {/* QR CODE */}
            <div className="flex justify-center">
              <img
                src={qrCodeUrl}
                alt="UPI QR Code"
                className="border rounded-xl mx-auto"
              />
            </div>

            <p className="text-center text-sm text-gray-500">
              Scan QR using Google Pay / PhonePe / Paytm
            </p>

            {/* PAY BUTTON */}
            <button
              onClick={handleUpiPay}
              className="w-full bg-black text-white py-3 rounded-xl
                         hover:bg-gray-800 transition font-medium"
            >
              Pay ₹{totalPrice} via UPI
            </button>
          </div>

          {/* BACK */}
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 underline text-center w-full"
          >
            Go back
          </button>
          {/* CONTINUE */}
          <button
            onClick={() => router.push("/checkout/payment")}
            className="w-full bg-black text-white py-4 rounded-2xl font-medium
                       hover:bg-gray-800 transition active:scale-[0.99]"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
