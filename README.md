This monorepo is managed by [Turborepo](https://turborepo.com/).

The [Next.js](https://nextjs.org) app is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The `finance-library` is packaged with [Vite](https://vite.dev/).

## Overview

#### Brief

Design and build a simple javascript library that can be included in the <head> tag of
a website. The library should load itself when included on a webpage. The library
should allow a user to process a CSV file of bank transactions and produce a
personal profit and loss statement from them.

#### Tech Stack

- Turborepo managed monorepo
- Next.js & Typescript
- Vite bundled Typescript library
    - Papaparse for CSV parsing
- SCSS
- Vercel hosted

## Improvement ideas

- Drag-and-drop CSV support
- Group income/expenses by month if transactions overlap months


## Getting Started

First make sure all dependencies are installed by running:

```bash
npm install
```

Then run the development server (the `finance-library` will also rebuild when changes are saved):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.