# Sahil Raza — Portfolio & Blog

A minimal, classy personal portfolio and blog with a black theme. Built with React, Vite, Tailwind CSS, and Sanity CMS.

## Features

- **Home** — Hero with "Hello! I'm" / "I work on" structure, interests overview
- **About** — Personal intro, domains of interest, contact
- **Blog** — Posts managed via Sanity CMS with rich text
- **List of Lists** — Curated collections (books, films, tools, inspirations)

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

The portfolio reads blog posts from Sanity. Ensure:

- `.env` has `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` (or copy from `.env.example`)
- Your Sanity Studio (`studio-hello-world`) is configured with the same project ID and dataset
- Run Sanity Studio to add blog posts: `cd ../studio-hello-world && npm run dev`

### 3. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity Studio

The blog schema lives in `studio-hello-world`:

- **post** — title, slug, excerpt, category, publishedAt, body (Portable Text)
- **blockContent** — rich text for post body

Start the studio:

```bash
cd ../studio-hello-world
npm run dev
```

Create posts in the studio; they appear on the Blog page after publishing.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
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
