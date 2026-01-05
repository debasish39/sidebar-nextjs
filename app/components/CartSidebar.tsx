"use client";

import { Suspense, lazy } from "react";
import Spinner from "./Spinner";

const CartSidebarContent = lazy(() => import("./CartSidebarContext"));

export default function CartSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <Suspense fallback={<Spinner />}>
      <CartSidebarContent onClose={onClose} />
    </Suspense>
  );
}
