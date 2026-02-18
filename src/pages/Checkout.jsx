import { useMemo, useState } from "react";
import BasketItem from "../components/BasketItem";
import { useBasketStore } from "../store/basketStore";
import { useAuthStore } from "../store/authStore";
import { formatZAR } from "../lib/money";
import { api } from "../lib/api";
import { loadStripe } from "@stripe/stripe-js";
import { products } from "../data/products";

export default function Checkout() {
  const { user } = useAuthStore();
  const items = useBasketStore((s) => s.items);
  const subtotal = useBasketStore((s) => s.subtotal());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const productLookup = useMemo(() => new Map(products.map((p) => [p.id, p])), []);

  const shipping = subtotal > 1000 ? 0 : items.length ? 69 : 0;
  const total = subtotal + shipping;

  const handlePay = async () => {
    setError("");
    if (!user) return setError("Please login before checking out.");
    if (items.length === 0) return setError("Your basket is empty.");

    try {
      setBusy(true);
      const origin = import.meta.env.VITE_APP_URL || window.location.origin;

      const cleanItems = items.map((i) => {
        const full = productLookup.get(i.id) || i;
        return { ...full, qty: i.qty };
      });

      const { data } = await api.post("/create-checkout-session", {
        items: cleanItems,
        userId: user.id,
        email: user.email,
        origin
      });

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      if (data?.id && stripe) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      }
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || "Something went wrong starting checkout.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <p className="mt-1 text-sm text-slate-600">Review items in your basket</p>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="rounded border bg-white p-4 text-slate-600">
              Your basket is empty. Go back and add products.
            </div>
          ) : (
            items.map((item) => <BasketItem key={item.id} item={item} />)
          )}
        </div>

        <aside className="h-fit rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Order Summary</h3>

          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatZAR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">{shipping === 0 ? "FREE" : formatZAR(shipping)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold">{formatZAR(total)}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-3 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            disabled={busy || items.length === 0}
            onClick={handlePay}
            className="mt-4 w-full rounded bg-yellow-500 px-3 py-2 font-semibold text-slate-900 hover:bg-yellow-400 disabled:opacity-60"
          >
            {busy ? "Redirecting..." : "Proceed to Payment"}
          </button>

          <p className="mt-3 text-xs text-slate-500">Payments handled by Stripe Checkout.</p>
        </aside>
      </div>
    </div>
  );
}
