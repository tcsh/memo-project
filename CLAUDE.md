# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This repository's application code lives in `memo-app/`, a Vite + React project. Commands below must be run from that directory (`cd memo-app`).

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build (output to `memo-app/dist/`, gitignored)
- `npm run preview` — preview the production build locally
- `npm run lint` — lint with [Oxlint](https://oxc.rs) (config: `memo-app/.oxlintrc.json`, plugins: `react`, `oxc`)

There is no test script configured yet.

## Architecture

- `memo-app/src/main.jsx` — entry point, mounts `<App />` into `#root` inside `React.StrictMode`.
- `memo-app/src/App.jsx` — root component. Currently a minimal placeholder (`<h1>メモアプリ</h1>`); the memo app's features have not been built out yet.
- `memo-app/src/index.css` — global styles and CSS custom properties (light/dark via `prefers-color-scheme`).
- `memo-app/src/App.css` — component-level styles for `App.jsx`.
- `memo-app/vite.config.js` — Vite config using `@vitejs/plugin-react`.

The project was scaffolded with `npm create vite@latest` (React template) and had the template's default demo UI and unused assets removed.
