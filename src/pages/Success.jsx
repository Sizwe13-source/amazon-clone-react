import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useBasketStore } from "../store/basketStore";
import { useAuthStore } from "../store/authStore";

export default function Success() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const items = useBasketStore((s) => s.items);
  const clearBasket = useBasketStore((s) => s.clearBasket);

  const [status, setStatus] = useState("Saving your order...");
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setError("Missing session_id.");
      setStatus("Could not confirm order.");
      return;
    }

    if (!user) {
      setError("Please login again to view your order.");
      setStatus("Login required.");
      return;
    }

    const saveOrder = async () => {
      try {
        setError("");
        setStatus("Verifying payment and saving order...");

        await api.post("/verify-order", { sessionId, items });

        clearBasket();
        setStatus("Order saved successfully ✅");

        setTimeout(() => navigate("/orders"), 800);
      } catch (err) {
        const msg = err?.response?.data?.error || err?.message || "Failed to save your order.";
        setError(msg);
        setStatus("Something went wrong.");
      }
    };

    saveOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold">Payment Success</h2>
        <p className="mt-2 text-slate-700">{status}</p>

        {error && (
          <div className="mt-3 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <Link className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-800" to="/">
            Back Home
          </Link>
          <Link className="rounded border px-4 py-2 hover:bg-slate-50" to="/orders">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
