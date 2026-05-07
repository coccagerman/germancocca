# Germán Cocca

Professional portfolio and blog built with Next.js, TypeScript, and a server-first architecture.

This site is designed to do two things at the same time:

- Present a clear professional profile for recruiters, clients, and collaborators.
- Act as a technical artifact that shows how I structure, fetch, test, and ship production-oriented frontend work.

## What This Website Offers

From a user perspective, the website is a focused personal platform with four clear sections:

- Home: a concise introduction, positioning, and entry points to the rest of the site.
- Projects: selected case studies that show the type of products I build and the problems I solve.
- Blog: a searchable and paginated archive of articles sourced from Hashnode and presented with clean internal URLs.
- Contact: direct ways to reach me through email and professional channels.

The goal is not to be flashy for its own sake. The goal is clarity: who I am, what I build, what I write about, and how to contact me.

## Why This Project Matters Technically

Although the product scope is intentionally simple, the implementation reflects the kind of engineering decisions I care about in real projects:

- Server-first rendering with the Next.js App Router.
- Clean separation between UI and data-fetching logic.
- Typed normalization of external CMS-like data before it reaches the interface.
- SEO-aware route metadata for list and detail pages.
- Graceful degradation when external content is temporarily unavailable.
- Coverage at both unit and end-to-end levels.

This makes the repository a compact but credible example of how I approach frontend architecture: pragmatic, maintainable, and performance-conscious.

## Technical Highlights

### 1. Server-rendered blog integration

The blog content is fetched from the Hashnode GraphQL API and normalized in the data layer before being consumed by the UI. This avoids coupling components to raw API responses and keeps rendering logic simple.

Key implementation ideas:

- External fetching is centralized in `src/lib/hashnode.ts`.
- Blog filtering, pagination, date formatting, and URL building live in `src/lib/blog.ts`.
- Blog pages are rendered on the server and use revalidation to keep content fresh without shifting the workload to the client.

### 2. SEO-aware routing

Each main route defines metadata intentionally instead of relying on defaults.

Examples already implemented in the app:

- Route-specific titles and descriptions.
- Search and paginated blog states marked with `noindex` when appropriate.
- Article metadata generated from fetched post content.
- Static params generation for blog detail pages.

These decisions help the site stay readable for users and understandable for crawlers.

### 3. Resilient content delivery

External APIs fail. A portfolio should not collapse because a content provider is temporarily unavailable.

For that reason, the blog routes include defensive handling for API errors and missing content, returning stable fallback UI instead of broken pages.

### 4. Testing discipline

This project is backed by two complementary testing layers:

- Jest for unit-level validation of utilities, transformations, and component behavior.
- Playwright for real browser flows across the main routes.

That combination is important because it verifies both logic correctness and user-facing behavior.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Jest
- Playwright
- ESLint
- Hashnode GraphQL API

## Architecture Overview

```text
src/
	app/           App Router pages, metadata, and route composition
	components/    Reusable UI and section-level presentation
	lib/           Data fetching, normalization, filtering, and helpers
tests/
	e2e/           Playwright end-to-end coverage
```

Architectural choices:

- `src/app`: owns route composition and metadata.
- `src/components`: keeps presentation modular and reusable.
- `src/lib`: isolates business logic and external integrations.
- `tests/e2e`: validates that the application works as a user would experience it.

This split keeps responsibilities clear and makes the project easier to evolve.

## Current Features

### Home

- Professional positioning and clear navigation.
- First-contact page designed to establish credibility quickly.

### Projects

- Curated showcase of selected work.
- Focus on practical outcomes and concrete product thinking.

### Blog

- Remote article ingestion from Hashnode.
- Search by keyword.
- Pagination.
- Internal article pages with content rendering and source attribution.

### Contact

- Direct communication channel.
- Lightweight and intentional, without unnecessary friction.

## Engineering Decisions Worth Noticing

- Minimal client-side JavaScript where it is not needed.
- Metadata defined close to the route for maintainability.
- Typed transformations used to protect the UI from external schema changes.
- Utility functions extracted for deterministic unit testing.
- End-to-end coverage focused on real navigation and content visibility.

These are small decisions individually, but together they show a clear engineering standard.

## Running The Project Locally

This repository uses Yarn.

```bash
yarn install
yarn dev
```

Open http://localhost:3000 to view the site locally.

## Available Scripts

```bash
yarn dev
yarn build
yarn start
yarn lint
yarn test
yarn e2e
```

## Testing

Unit tests cover utility and component behavior.

```bash
yarn test
```

End-to-end tests cover the main navigation flow and blog behavior.

```bash
yarn e2e
```

This dual setup reflects how I prefer to work on production-facing interfaces: validate isolated logic quickly, then verify the actual browser experience.

## Content Source

The blog is powered by the Hashnode GraphQL endpoint:

```text
https://gql.hashnode.com
```

Posts are fetched, normalized, sorted, and rendered within the site so the reading experience stays consistent with the rest of the portfolio.

## Deployment Mindset

The project is designed for a low-friction deployment flow, with a structure that works well on platforms like Vercel while still following sound frontend engineering practices.

## Summary

This repository is more than a personal website. It is a compact demonstration of how I build web products:

- clear UX and positioning
- strong TypeScript boundaries
- server-first Next.js architecture
- SEO-conscious rendering
- resilient external integrations
- real test coverage

If you are evaluating my work as a developer, this project is meant to show both product sensibility and implementation discipline.
