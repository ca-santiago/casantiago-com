const pool = require('../lib/db');

const examplePost = {
  slug: 'hello-world',
  title: 'Hello World',
  content: `# Welcome to my blog

This is my first post! Here's what you can do:

## Features

- Write posts in **Markdown**
- Live preview while editing
- Publish or save as draft
- Clean, retro design

## Getting Started

Visit [\`/system/admin/blog\`](/system/admin/blog) to write a new post.

### Code example

\`\`\`javascript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

---

Happy writing! ✨`,
  excerpt: 'Welcome to my blog. Learn how to write and publish posts.',
  publishedAt: new Date().toISOString(),
};

async function seedDb() {
  try {
    const result = await pool.query(
      `INSERT INTO posts (slug, title, content, excerpt, "publishedAt", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       ON CONFLICT (slug) DO NOTHING
       RETURNING *`,
      [
        examplePost.slug,
        examplePost.title,
        examplePost.content,
        examplePost.excerpt,
        examplePost.publishedAt,
      ]
    );

    if (result.rows.length > 0) {
      console.log('✅ Example post created:', result.rows[0].slug);
    } else {
      console.log('ℹ️  Post already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedDb();
