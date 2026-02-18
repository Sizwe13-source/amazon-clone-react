import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { formatZAR } from "../lib/money";

export default function Orders() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setError("");
        setBusy(true);

        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        setError(err.message || "Failed to load orders.");
      } finally {
        setBusy(false);
      }
    };

    if (user?.id) fetchOrders();
  }, [user]);

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      <p className="mt-1 text-sm text-slate-600">Stored in Supabase</p>

      {busy && <p className="mt-4 text-slate-600">Loading orders...</p>}

      {error && (
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {!busy && !error && orders.length === 0 && (
        <div className="mt-4 rounded border bg-white p-4 text-slate-600">No orders yet.</div>
      )}

      <div className="mt-4 space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded border bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-sm text-slate-500">{new Date(order.created_at).toLocaleString()}</div>
                <div className="text-sm text-slate-500">
                  Stripe Session: <span className="font-mono">{order.stripe_session_id}</span>
                </div>
              </div>

              <div className="text-lg font-bold">{formatZAR((order.amount || 0) / 100)}</div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="rounded border p-2">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-slate-600">
                    Qty: {item.qty} • Price: {formatZAR(item.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
