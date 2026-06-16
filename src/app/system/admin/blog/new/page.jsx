export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import pool from '@/../../lib/db';

export default async function NewPost() {
  const slug = 'draft-' + Date.now().toString(36);
  await pool.query(
    `INSERT INTO posts (slug, "createdAt", "updatedAt") VALUES ($1, NOW(), NOW())`,
    [slug]
  );
  redirect(`/system/admin/blog/${slug}`);
}
