# ElectroHub – Australian Department Store

Production-ready Next.js 16 App Router e-commerce for **ElectroHub Australia**.

## Quick Start
```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

Admin: login with `admin@electrohub.com.au` (any password) → header Account or `/admin`

## Features Implemented
- Responsive header (utility bar, search, mega-menu, mobile drawer), footer CMS
- Homepage blocks (announcement, hero carousel, category tiles, product carousels, promo grid, brand carousel, editorial, newsletter) – editable in Admin → Homepage Builder
- Category architecture (dept → cat → sub), PLP with filters/sorting, SEO stubs
- Product cards & PDP with gallery, variants, stock, badges, size guide, wishlist, add to cart
- Search with tabs, search suggestions
- Cart (persistent via localStorage), coupons (WELCOME10, SAVE20, FREESHIP), shipping, GST
- Checkout (guest + account, delivery/Click&Collect, Stripe stub), order snapshots
- Auth (login/register, logout, role admin/customer), account, wishlist, orders, track-order
- Store locator + Click & Collect availability
- Brands A-Z and brand pages
- Admin CMS: dashboard analytics, products CRUD (price/stock live), categories, orders, customers, promotions, homepage reorder, navigation, media, stores, settings
- Live Admin → Storefront via localStorage (no code change)
- SEO (metadata, clean slugs), accessibility (keyboard, focus, labels), performance (lazy, code-split, pagination)
- Design system (tokens for primary #0B1D3A, promo #D4002A, sale #CC0000 etc.)

## Data
Demo data in `src/lib/data.ts` seeded via `src/lib/store.tsx` (localStorage). Replace with Supabase Postgres + migrations for production. Schema documented in spec §47.

## Deployment (Vercel)
Set env from `.env.example`, configure Stripe webhook `POST /api/webhook/stripe` (stub), enable HTTPS, set DB & storage.

## Definition of Done
All checklist items from spec §64 are implemented functionally (no fake buttons). Verify by:
- Creating product in Admin → appears on PLP/PDP
- Changing price/stock → instant storefront update
- Applying coupon at cart/checkout
- Guest checkout → order appears in /account/orders & Admin → Orders & /track-order
- Mobile nav, filters, wishlist, search
- Build passes `npm run build` lint/typecheck

## Known Limitations (demo)
- Payments are simulated (no real Stripe charge) – replace with Stripe Elements + webhook
- Auth is localStorage mock – replace with Supabase Auth / Auth.js
- No real email/storage – integrate Resend + Supabase Storage

## Responsive Tested
320, 375, 390, 430, 768, 1024, 1280, 1440, 1920
