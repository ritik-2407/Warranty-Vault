# WarrantyVault

Never lose track of a product warranty again. WarrantyVault lets you store all your purchase warranties in one place, counts down the days remaining, and keeps your receipts handy — right in your browser.

## Features

- **Live Countdown** — See exactly how many days are left on every warranty. Color-coded alerts warn you 90 days before expiry.
- **Receipt Storage** — Attach a photo of your bill or receipt to each product and view it full-screen whenever you need it.
- **100% Private** — All data lives in your browser's `localStorage`. Nothing is ever sent to a server.
- **Add / Edit / Delete** — Full CRUD for your products through a clean modal form.
- **Expired section** — Warranties that have already lapsed are moved to a separate "Expired" section so your active list stays clean.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Storage | Browser `localStorage` |

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  page.tsx          # Landing page
  products/         # Products dashboard route
components/
  landing/          # Landing page sections
  layout/           # Shared layout (nav, footer, shell)
  products/         # Product cards, dashboard, form modal
  ui/               # Reusable UI primitives
hooks/
  useProducts.ts    # All product state & CRUD logic
lib/
  products/
    types.ts        # Product & WarrantyUnit types
    date-utils.ts   # Days remaining helpers
    expires-in.ts   # Human-readable expiry strings
    storage.ts      # localStorage read/write
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server at `localhost:3000` |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
