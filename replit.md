# SmileCare Dental Clinic

A premium multilingual dental clinic website with a futuristic glassmorphism aesthetic, cinematic animations, and full RTL/LTR support for English, Persian, and Pashto.

## Run & Operate

- `pnpm --filter @workspace/dental-clinic run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v4
- Animations: Framer Motion + GSAP + ScrollTrigger
- 3D: Three.js + React Three Fiber + @react-three/drei (lazy-loaded, WebGL-gated)
- Multilingual: i18next + react-i18next + i18next-browser-languagedetector
- Routing: Wouter
- UI: shadcn/ui + Radix + Lucide icons

## Where things live

- `artifacts/dental-clinic/src/i18n/` — translation files (en.json, fa.json, ps.json) and i18n init
- `artifacts/dental-clinic/src/sections/` — Hero, Services, Doctors, About, Appointment sections
- `artifacts/dental-clinic/src/components/` — Navbar, Footer, LoadingScreen, CustomCursor, FloatingContact, ThreeCanvas
- `artifacts/dental-clinic/src/hooks/` — useGSAP, useScrollAnimation, useMousePosition, useTheme
- `artifacts/dental-clinic/src/index.css` — full theme palette (dark navy + cyan, light mode)

## Architecture decisions

- Three.js Canvas is lazy-loaded and gated behind a `isWebGLAvailable()` check — falls back to a CSS orb animation when WebGL unavailable
- Default theme is dark mode (deep navy/black), togglable to light (white/silver)
- RTL is applied via `dir="rtl"` on `<html>` when language is Persian (fa) or Pashto (ps)
- Single-page scrolling architecture with smooth scroll to section IDs

## Product

SmileCare Clinic — a luxury dental clinic website featuring:
- Animated loading screen
- GSAP/Framer Motion hero with floating 3D tooth model
- Services grid with glassmorphism cards and glow hover effects
- Doctor profiles with modal popups
- Mission/vision/timeline about section
- Appointment booking form with zod validation
- Language switcher (EN / فارسی / پښتو)
- Dark/light mode toggle
- Custom cursor (desktop only)
- Floating WhatsApp contact button

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run `pnpm --filter @workspace/dental-clinic run dev` (not root-level `pnpm dev`) 
- Three.js requires WebGL — the CSS fallback orb is shown when not available (e.g. in Replit preview sandbox)
- RTL support: use logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`) for new components

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
