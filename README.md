# Assessment - Finance Dashboard Frontend

A responsive financial dashboard built with Next.js 16, React 19, Tailwind CSS v4, Recharts, and Zustand. The app presents a clean finance UI with role-based transaction management, chart-driven insights, and resilient widget fallbacks so missing data does not crash the frontend.

## Initial Setup

### Requirements

- Node.js `20.9+`
- npm `10+` recommended

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/dashboard`.


## Overview Of The Approach

This project uses the Next.js App Router for layout-driven composition and route-level loading states. The dashboard is split into reusable widgets, with dynamic imports used for heavier sections so skeletons can render immediately while the UI loads.

Mock finance data lives in [`data/mockData.ts`](/data/mockData.ts), while interactive transaction and role state lives in a persisted Zustand store at [`store/dashboard-store.ts`](/store/dashboard-store.ts). This keeps the UI simple to demo, while still allowing CRUD interactions without a backend.

The dashboard is also designed to fail gracefully. Data-driven components now accept optional data, sanitize what they receive, and render empty states instead of throwing when arrays or objects are missing. A route-level dashboard error boundary adds one more recovery layer for unexpected runtime issues.

## Features

- Responsive dashboard layout with desktop multi-column rendering and mobile tab switching
- Theme toggle with light and dark mode support
- Overview summary cards for total income, expense, and savings
- Cashflow bar chart with period filtering
- Statistics donut chart with income and expense tab switching
- Upcoming billing timeline
- Savings plan progress cards
- Daily spending limit card with progress indicator
- Transaction management with admin/viewer role toggle
- Add, edit, delete, filter, and sort support for transactions
- Loading skeletons for dashboard sections
- Friendly empty states when widget data is missing

## Data Safety And Missing Data Handling

The UI now protects against the most common missing-data cases:

- `undefined` or `null` props passed into dashboard widgets
- empty arrays passed to mapped components
- incomplete numeric values used in totals, charts, and progress bars
- malformed transaction entries coming from persisted client state
- missing dashboard data that would otherwise break chart or list rendering

When data is unavailable, components render a clear placeholder state instead of crashing the app. If something still throws unexpectedly at runtime, the dashboard route falls back to a recovery screen defined in [`app/(home)/dashboard/error.tsx`](/D:/Rishabh/arcs/intern-assessment-dashboard/app/(home)/dashboard/error.tsx).

## Main Project Structure

- [`app`](/app): App Router layouts, pages, loading states, and route error handling
- [`components`](/components): Dashboard widgets, skeletons, and UI primitives
- [`data`](/data): Mock dashboard content and typed demo data
- [`store`](/store): Zustand state for role and transactions
- [`types`](/types): Shared TypeScript types

## Notes

- The current app is frontend-focused and uses mock data rather than a live API.
- Transaction changes persist in the browser through Zustand persistence.
- The widget boundaries make it straightforward to replace mock data with API-backed data.
