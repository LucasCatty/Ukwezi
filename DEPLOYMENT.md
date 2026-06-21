# Ukwezi Deployment Notes

## What is included now

- React/Vite storefront with a checkout section.
- Rwanda payment choices: MTN MoMo, Airtel Money, and bank transfer.
- Browser order storage under `localStorage` key `ukwezi_orders`.
- Music control in the header.
- Netlify and Vercel deployment config.

## Database

For a real online database, use Supabase:

```sql
create table orders (
  id text primary key,
  created_at timestamptz not null default now(),
  items integer not null,
  total_rwf integer not null,
  payment_method text not null,
  customer jsonb not null,
  status text not null default 'pending_payment'
);
```

Then add these variables from `.env.example`:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

The current app saves orders locally so the checkout can be tested without an account. To go live, replace the `localStorage.setItem` call in `src/app/App.tsx` with a Supabase insert.

## Rwanda Payments

Do not put payment secret keys in the React app. Real MTN MoMo, Airtel Money, and bank payments should run through a backend or serverless function.

Common setup:

1. Create a payment account with a Rwanda-supported gateway or aggregator.
2. Create a serverless endpoint like `/api/payments/create`.
3. Send order id, phone, amount, and payment method from the frontend.
4. Let the backend call the provider with secret keys.
5. Use provider webhooks to update the order status.

## Deploy

Netlify:

1. Push the project to GitHub.
2. Import it in Netlify.
3. Use build command `npm run build` and publish directory `dist`.

Vercel:

1. Push the project to GitHub.
2. Import it in Vercel.
3. Vercel will use `vercel.json`.
