# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A basic React expense tracker. This is a course starter project that intentionally ships with a bug, poor UI, and messy code, meant to be fixed incrementally.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run ESLint
```

There is no test suite configured.

## Architecture

- Vite + React 19, plain JS/JSX (no TypeScript, no router, no state library).
- `App.jsx` owns the `transactions` array (`useState`) and the `categories` list, and composes three presentational/stateful children: `Summary`, `TransactionForm`, and `TransactionList`. There are no other hooks or utility modules — `main.jsx` just mounts `App`.
- Transaction records are plain objects (`{ id, description, amount, type, category, date }`); `amount` is stored as a number (converted from the form's string input in `TransactionForm` via `Number(amount)`).
- `Summary` (`src/Summary.jsx`) takes `transactions` as a prop and derives `totalIncome`, `totalExpenses`, and `balance` itself via `reduce`.
- `TransactionForm` (`src/TransactionForm.jsx`) owns its own field state (description/amount/type/category) and calls the `onAddTransaction` callback prop with a new transaction object on submit; it does not touch `App`'s state directly.
- `TransactionList` (`src/TransactionList.jsx`) owns its own filter state (`filterType`/`filterCategory`) and renders the filters plus the transactions table from the `transactions`/`categories` props it receives.
- Styling is plain CSS in `src/App.css` / `src/index.css`, no CSS-in-JS or utility framework.
