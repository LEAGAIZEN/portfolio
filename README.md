# Portfolio App

An interactive portfolio built with React, TypeScript, Vite, Tailwind CSS, and Motion. The app presents a desktop-style interface with draggable windows, a dock, system states, and custom project sections for About, Projects, Skills, Certifications, Resume, and Contact.

## Features

- Desktop-inspired portfolio layout with window management.
- Drag, minimize, maximize, and close behavior for content panels.
- Animated UI built with `motion` and Tailwind CSS.
- Responsive layout that works in a browser and in mobile-sized viewports.

## Local Development

### Prerequisites

- Node.js 20+ recommended.
- npm.

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

The app runs on port `3000` by default.

### Build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - start the Vite development server.
- `npm run build` - create a production build.
- `npm run preview` - preview the production build locally.
- `npm run lint` - type-check the project with TypeScript.

## Project Structure

- `src/App.tsx` - main application shell and window management.
- `src/components/` - portfolio windows, dock, and menu bar.
- `src/types.ts` - shared TypeScript types.
- `index.html` - app entry HTML.

## Notes

This repository now documents the app as a standalone portfolio project.
