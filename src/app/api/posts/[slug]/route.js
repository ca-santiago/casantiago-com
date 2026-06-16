import pool from '@/../../lib/db';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const result = await pool.query('SELECT * FROM posts WHERE slug = $1', [slug]);

    if (result.rows.length === 0) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { slug } = params;
    const body = await request.json();

    const allowed = ['title', 'content', 'excerpt', 'publishedAt', 'cover_image', 'tags'];
    const fields = Object.keys(body).filter((k) => allowed.includes(k));
    if (fields.length === 0) return Response.json({ error: 'Nothing to update' }, { status: 400 });

    const sets = fields.map((k, i) => `"${k}" = $${i + 1}`).join(', ');
    const values = fields.map((k) => body[k]);
    values.push(new Date().toISOString(), slug);

    const result = await pool.query(
      `UPDATE posts SET ${sets}, "updatedAt" = $${values.length - 1} WHERE slug = $${values.length} RETURNING *`,
      values
    );

    if (result.rows.length === 0) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    const result = await pool.query('DELETE FROM posts WHERE slug = $1 RETURNING *', [slug]);

    if (result.rows.length === 0) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
