# 📘 Project Documentation — Personal Website (Portfolio + Blog)

## 1. 🧭 Project Overview

This project is a **personal website** that serves as:

- A professional **portfolio**
- A **contact hub**
- A **content platform (blog)**

The goal is to present the developer’s profile clearly, showcase real work, and centralize content published externally (e.g., Hashnode / freeCodeCamp).

This is **not just a static site** — it should be designed with scalability, performance, and maintainability in mind.

All the text within the website has to be in english, as the target audience is global. This includes project descriptions, blog content, and UI elements.

---

## 2. 🎯 Objectives

### Primary goals

- Present a **clear professional identity**
- Showcase **real, high-quality projects**
- Aggregate and display **blog articles**
- Provide **easy ways to get in touch**

### Secondary goals

- Optimize for **performance and SEO**
- Keep infrastructure **low-cost or free**
- Ensure **clean architecture and extensibility**
- Allow future evolution (e.g., SaaS, tools, experiments)

---

## 3. 🧱 Tech Stack

- Framework: **Next.js (App Router)**
- Language: **TypeScript**
- Styling: TailwindCSS
- Deployment: Vercel
- Content sources:
    - External: Hashnode (via GraphQL API)
    - Internal: Optional MDX (future)

---

## 4. 📂 High-Level Structure

The application should be structured in a **modular and scalable way**.

Expected main sections:

- `/` → Home / Landing
- `/projects` → Portfolio projects
- `/blog` → Blog posts (aggregated)
- `/blog/[slug]` → Individual post view
- `/contact` → Contact information / form

---

## 5. 🧩 Core Features

### 5.1 Home Page

Purpose:

- First impression
- Quick understanding of who the developer is

Should include:

- Name and role (e.g., Fullstack Developer)
- Short description / positioning
- Links to:
    - Projects
    - Blog
    - Contact
    - Socials

---

### 5.2 Projects (Portfolio)

Purpose:

- Demonstrate real capabilities

Each project should include:

- Title
- Description
- Tech stack
- Screenshots or visuals
- Links (live / repo)

Projects should be **curated**, not exhaustive.

---

### 5.3 Blog

Purpose:

- Show expertise and thinking
- Reuse existing content from Hashnode / freeCodeCamp

Implementation notes:

- Fetch posts from Hashnode via GraphQL API
- Normalize data into internal structure

Example internal type:

```ts
type Post = {
    title: string
    description: string
    slug: string
    date: string
    cover?: string
    source: 'hashnode' | 'local'
}
```

## 5.4 Contact

**Purpose:**

Enable easy communication

**Should include:**

- Email
- Social links (LinkedIn, GitHub, etc.)
- Optional contact form (future)

---

## 6. 🔌 External Integrations

### Hashnode API

- Use GraphQL endpoint: `https://gql.hashnode.com`
- Fetch posts using `publication(host: "...")`
- Avoid client-side fetching when possible

**Prefer:**

- Static generation (SSG)
- Incremental Static Regeneration (ISR)

---

## 7. ⚙️ Architectural Guidelines

### Data Layer

- All external data fetching should be abstracted into:
    - `/src/lib/` (e.g., `hashnode.ts`)
- Never fetch directly inside components unless necessary

---

### Rendering Strategy

**Prefer:**

- Static generation (SSG)
- ISR for blog content

**Avoid:**

- Unnecessary client-side fetching
- Tight coupling with external APIs

---

### Component Design

Components must be:

- Reusable
- Small and focused

Separate:

- UI components
- Data logic

---

### Styling

- Consistent design system
- Avoid ad-hoc styles
- Prefer utility-first (e.g., Tailwind)

---

## 8. 🧠 AI Instructions (IMPORTANT)

Before implementing anything, the AI MUST:

1. Read this entire document
2. Understand:
    - The purpose of the project
    - The section it is working on
3. Validate:
    - Does this change align with project goals?
4. Avoid:
    - Overengineering
    - Premature abstractions
    - Adding unnecessary dependencies

---

## 9. 🚫 Non-Goals (for now)

- Authentication systems
- Complex backend
- CMS integration (beyond Hashnode)
- Real-time features
- Overly complex animations

---

## 10. 📈 Future Enhancements

Possible future additions:

- MDX-based blog (local content)
- Newsletter integration
- Analytics dashboard
- SaaS tools / micro-products
- AI-powered features

---

## 11. 🧪 Development Principles

- Clarity over cleverness
- Performance by default
- Keep it simple, but extensible
- Every feature should have a purpose

---

## 12. ✅ Definition of Done

A feature is considered complete when:

- It works correctly
- It is typed (TypeScript)
- It follows project structure
- It is readable and maintainable
- It aligns with project goals

---

## Final Note

This project is a **professional asset**, not just a playground.

Every decision should answer:

> “Does this improve how I present my work and capabilities?”
