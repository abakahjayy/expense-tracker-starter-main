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
- The entire app lives in `src/App.jsx` as a single component: transaction state, the add-transaction form, filters, and the summary/table rendering are all colocated there. There are no subcomponents, hooks, or utility modules yet — `main.jsx` just mounts `App`.
- Transaction records are plain objects (`{ id, description, amount, type, category, date }`) held in `useState`; `amount` is stored as a string from the form input and is not converted to a number before being used in arithmetic (income/expense/balance totals), which is the source of the intentional starter bug.
- Styling is plain CSS in `src/App.css` / `src/index.css`, no CSS-in-JS or utility framework.
