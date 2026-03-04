# Sahil Raza — Portfolio & Blog

A minimal, classy personal portfolio and blog with a black theme. Built with React, Vite, Tailwind CSS, and Sanity CMS.

## Features

- **Home** — Hero with "Hello! I'm" / "I work on" structure, interests overview
- **About** — Personal intro, domains of interest, contact
- **Blog** — Posts managed via Sanity CMS with rich text
- **List of Lists** — Curated collections (books, films, tools, inspirations), managed via Sanity

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Motion (animations)
- Sanity CMS (blog content)
- React Router

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Sanity Configuration

The portfolio reads blog posts and lists from Sanity. Ensure:

- `.env` has `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` (or copy from `.env.example`)
- Sanity Studio lives in the `studio/` folder of this repo — see [Sanity Studio](#sanity-studio) below

### 3. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity Studio

Sanity Studio lives in the `studio/` folder of this repo. Schemas:

- **post** — title, slug, excerpt, category, publishedAt, body (Portable Text)
- **category** — title, slug (for post categorization)
- **blockContent** — rich text for post body
- **list** — title, order, isExternal, href (for external links), items (array of strings)

**First-time setup:**

```bash
cd studio && npm install
```

**Run the studio locally:**

```bash
npm run studio
```

Studio runs at [http://localhost:3333](http://localhost:3333). Create posts and lists; they appear on the Blog and List of Lists pages after publishing.

**Deploy Studio (optional):**

```bash
npm run studio:deploy
```

Deploys Studio to `https://your-project.sanity.studio` for editing from anywhere.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
studio/                 # Sanity Studio (CMS)
├── schemas/
│   ├── category.ts
│   ├── post.ts
│   ├── list.ts
│   └── index.ts
├── sanity.config.ts
└── sanity.cli.ts
src/
├── components/
│   └── Layout.tsx      # Nav + shell
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   └── Lists.tsx
├── lib/
│   └── sanity.ts
├── App.tsx
├── main.tsx
└── index.css
```

## License

Private — All rights reserved.
