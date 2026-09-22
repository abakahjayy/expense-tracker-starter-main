# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A React finance tracker: a public landing page, email/password + Google auth, and a dashboard for
logging and reviewing income/expense transactions. It started as a bare-bones course starter and has
since grown into a full app backed by a real API — see "Backend" below before assuming any data is local.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server (picks the next free port from 5173)
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run ESLint
```

There is no test suite configured.

## Environment

Copy `.env.example` to `.env` and set `VITE_API_URL` to the backend's base URL (defaults to
`http://localhost:7004` if unset — fine for local dev, but production deploys must set this explicitly
via the host's environment variable settings, not a committed file). `.env` is gitignored;
`.env.example` is the only env file that should be committed.

The app is a client-side-routed SPA (`react-router-dom`), so a static host needs a rewrite rule so deep
links / refreshes on `/login`, `/dashboard`, etc. don't 404. `public/_redirects` (Netlify) and
`vercel.json` (Vercel) already cover this — add the equivalent for any other host.

## Backend

This frontend talks to a separate Express/Mongo API (not in this repo — see the sibling `FullBackendd`
project) at `${VITE_API_URL}/api/v1/...`. Relevant routes it depends on:

- `POST /auth/signup`, `POST /auth/login` — expect `{ firstName, lastName, username, email, password }`
  / `{ email, password }`, return `{ token, userId, message }` on success.
- `GET /auth/google` + `GET /auth/google/callback` — Passport-based OAuth redirect flow; the callback
  redirects back to this app's `/auth/callback?token=...`.
- `GET /auth/dashboard` — `Authorization: Bearer <token>`, returns `{ user }`; used to fetch the
  logged-in user's profile after any login path.
- `GET/POST /transactions`, `DELETE /transactions/:id` — all behind the same bearer-token auth,
  scoped per-user server-side.

Error responses from this backend use `{ msg, error }` (not `{ message }`) — `utils/auth.js` and
`utils/transactionsApi.js` both check `data.message || data.msg || data.error` when surfacing errors,
and don't assume either shape.

A 401 from the transactions API means the token itself is invalid (signature/expiry fine, but no
matching user — e.g. a stale token from before the DB was reseeded), not just "this request failed".
`transactionsApi.js` tags these as `err.isAuthError`; `Dashboard.jsx` treats that as "log the user out
and send them to `/login`" rather than retrying or just toasting the error.

## Architecture

- Vite + React 19, plain JS/JSX (no TypeScript), `react-router-dom` for client-side routing, no other
  state library — auth/theme state lives in `App.jsx`, everything else is local component state.
- Folder layout under `src/`:
  - `pages/` — one component per route: `Landing`, `Dashboard`, `Login`, `Signup`, `AuthCallback`.
  - `components/` — shared/presentational pieces: `Navbar`, `Footer`, `Avatar`, `Toast`, `Summary`,
    `TransactionForm`, `TransactionList`.
  - `hooks/` — `useToast.js` (the `ToastContext` + `useToast()` hook; the provider component itself is
    `components/Toast.jsx` since it renders the toast viewport UI).
  - `utils/` — non-component modules: `config.js` (env/URL helpers), `auth.js` (localStorage session +
    `fetchCurrentUser`), `transactionsApi.js` (fetch wrapper for the transactions endpoints).
  - `App.jsx` / `main.jsx` / `App.css` / `index.css` stay at `src/` root.
- Routes (declared in `App.jsx`): `/` landing, `/dashboard` the transactions app, `/login`, `/signup`,
  `/auth/callback` (handles the Google OAuth redirect). Login/signup/Google all navigate to `/dashboard`
  on success.
- `App.jsx` owns `theme` (persisted to `localStorage` + `data-theme` on `<html>`, respects
  `prefers-color-scheme` on first load) and `user` (initialized from `utils/auth.js`'s
  `getStoredAuth()`). It passes `handleLogout`/`handleSessionExpired` down; both clear stored auth and
  reset `user` so the navbar and `localStorage` never drift apart.
- `Dashboard.jsx` owns the `transactions` array, fetched from the backend on mount (aborted via
  `AbortController` on unmount/re-run, not just ignored — StrictMode double-invokes this effect in dev,
  and without a real abort both requests hit the server). `TransactionForm`'s `onAddTransaction` and
  `TransactionList`'s `onDeleteTransaction` call through to `utils/transactionsApi.js`, which normalizes
  Mongo's `_id`/ISO `date` into the `{ id, date: "YYYY-MM-DD" }` shape the rest of the UI expects.
- `TransactionForm` builds today's date from local `Date` parts, not `toISOString()` (which is UTC and
  can be off by a day depending on timezone) — see `getLocalDateString()` in that file if touching dates.
- `Summary` takes `transactions` as a prop and derives `totalIncome`/`totalExpenses`/`balance` via
  `reduce`, formatting with `Intl.NumberFormat`.
- Toasts: call `useToast()` from `hooks/useToast.js` inside any component under `<ToastProvider>`
  (mounted in `main.jsx`) to get `{ success, error, info }`.
- Styling is plain CSS in `src/App.css` / `src/index.css` — CSS custom properties on `:root` for
  theming, overridden under `:root[data-theme="dark"]`. No CSS-in-JS or utility framework.
