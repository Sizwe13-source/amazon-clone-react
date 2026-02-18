import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4242;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY in .env");
  return new Stripe(key);
}

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  return createClient(url, serviceKey);
}

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const stripe = getStripe();
    const { items, userId, email, origin } = req.body || {};

    if (!userId) return res.status(400).json({ error: "Missing userId" });
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: "Basket is empty" });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "zar",
        product_data: {
          name: item.title,
          description: (item.description || "").slice(0, 300),
          images: item.image ? [item.image] : []
        },
        unit_amount: Math.round(Number(item.price) * 100)
      },
      quantity: item.qty
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: email || undefined,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: { userId }
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.post("/api/verify-order", async (req, res) => {
  try {
    const stripe = getStripe();
    const supabaseAdmin = getSupabaseAdmin();

    const { sessionId, items } = req.body || {};
    if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const userId = session.metadata?.userId;
    if (!userId) return res.status(400).json({ error: "Missing userId in metadata" });

    const { data: existing } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (existing?.id) return res.json({ ok: true, alreadySaved: true });

    const amount = session.amount_total || 0;
    const currency = session.currency || "zar";

    const { error } = await supabaseAdmin.from("orders").insert({
      user_id: userId,
      items: items || [],
      amount,
      currency,
      stripe_session_id: sessionId
    });

    if (error) return res.status(500).json({ error: "Failed to save order" });

    res.json({ ok: true });
  } catch (err) {
    console.error("verify-order error:", err);
    res.status(500).json({ error: "Failed to verify order" });
  }
});

app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
