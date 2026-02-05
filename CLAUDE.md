# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm start` — Start production server

No test framework is configured.

## Architecture

This is a QIVIGY infusion time calculator — a medical web app for computing IV immunoglobulin infusion rates and schedules. It runs entirely client-side with no backend API.

**Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4

**Key files**:
- `lib/qivigy-calc.ts` — Pure calculation logic (rate escalation, schedule building, time computation). Separated from UI for testability. Contains domain constants (concentration, rate steps, intervals) and types.
- `app/components/QivigyCalculator.tsx` — Main interactive component (`"use client"`). Handles form input, validation, result display with tabs, and print output.
- `app/calculator/page.tsx` — Calculator route wrapper
- `app/page.tsx` — Landing page with link to calculator

**Calculation model**: Two infusion modes with different rate escalation schedules:
- *First infusion*: Rates escalate 1.0 → 2.0 → 4.0 → 6.0 → 8.0 mg/kg/min at 30-minute intervals
- *Subsequent infusion*: Rates escalate 2.0 → 4.0 → 6.0 → 8.0 mg/kg/min at 15-minute intervals

Both use minute-by-minute iteration to compute total infusion time and build interval schedule tables.

**Path alias**: `@/*` maps to project root (configured in tsconfig.json).

## Deployment

Deployed via Netlify (config in `.netlify/`).
