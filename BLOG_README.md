# Blog Manager

Simple markdown blog system for casantiago.com

## Setup

### 1. Start PostgreSQL

```bash
docker-compose up
```

This starts a PostgreSQL instance on `localhost:5432`. The database and tables are created automatically.

### 2. Run the app

```bash
npm run dev
```

### 3. (Optional) Create example post

```bash
node scripts/seed-blog.js
```

This creates a demo post at `/blog/hello-world`.

## Usage

### Write & Publish

1. Go to `/system/admin/blog`
2. Enter title, slug, and write in Markdown
3. Click **Preview** to see rendering
4. Click **Save Draft** to save unpublished, or **Publish** to publish immediately

### View Published Posts

- `/blog` — List all published posts
- `/blog/[slug]` — Read individual post

## Database

Schema:
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  publishedAt TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

Environment variables:
```
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=casantiago_blog
```

## Features

- ✍️ Markdown editor with live preview
- 📝 Save drafts or publish immediately
- 📅 Automatic timestamps
- 🔗 Clean slug-based URLs
- 📱 Responsive design (retro aesthetic)

## Delete posts

Directly via API or manually in database.
