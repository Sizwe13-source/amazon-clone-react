#  Amazon Clone (Vite + React + Supabase + Stripe)

This is an Amazon-style landing page with:
- Products on landing page (hooks + props)
- Basket & checkout
- Supabase signup/login (Zustand)
- Stripe Checkout
- Orders stored in Supabase
- Axios + async/await + useEffect
- Tailwind + CSS + Material Icons

## Run locally
1) Install
```bash
npm install
```

2) Create `.env` in project root (copy from `.env.example`) and paste your keys.

3) Create the `orders` table in Supabase (SQL below)

4) Start app + server
```bash
npm run dev
```

- App: http://localhost:5173
- API server: http://localhost:4242
- Frontend calls backend via `/api/*` (Vite proxy)

## Supabase SQL (Orders table)
Run in Supabase > SQL editor:

