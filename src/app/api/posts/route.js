import pool from '@/../../lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published') === 'true';

    let query = 'SELECT * FROM posts';
    if (published) query += ' WHERE "publishedAt" IS NOT NULL';
    query += ' ORDER BY "publishedAt" DESC NULLS LAST';

    const result = await pool.query(query);
    return Response.json(result.rows || []);
  } catch (error) {
    console.error('Posts API error:', error);
    return Response.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    const { slug, title, content, excerpt, publishedAt, cover_image, tags } = await request.json();

    if (!slug) return Response.json({ error: 'slug is required' }, { status: 400 });

    const now = new Date().toISOString();
    const result = await pool.query(
      `INSERT INTO posts (slug, title, content, excerpt, cover_image, tags, "createdAt", "publishedAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (slug) DO UPDATE
       SET title = $2, content = $3, excerpt = $4, cover_image = $5, tags = $6,
           "publishedAt" = $8, "updatedAt" = $9
       RETURNING *`,
      [
        slug,
        title || null,
        content || null,
        excerpt || null,
        cover_image || null,
        tags || [],
        now,
        publishedAt ? new Date(publishedAt).toISOString() : null,
        now,
      ]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
