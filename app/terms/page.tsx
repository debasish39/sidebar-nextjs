"use client"
import { useEffect, useState } from "react";
export default function TermsPage() {
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const timer=setTimeout(()=>setLoading(false),900);
    return ()=>clearTimeout(timer);
  },[]);
  if(loading){
    return(
     <main className="min-h-[60vh] flex items-center justify-center">
        <div
          className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"
          aria-label="Loading about us page"
        />
      </main>
    )
  }
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="text-gray-700">
        By using this website, you agree to comply with our terms and conditions.
      </p>
    </main>
  );
}
