'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(() => import('@/components/blog/MarkdownEditor'), { ssr: false });

export default function EditPost({ params }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${params.slug}`)
      .then((r) => {
        if (!r.ok) throw new Error('Post not found');
        return r.json();
      })
      .then(setPost)
      .catch((e) => setError(e.message));
  }, [params.slug]);

  if (error) return (
    <div style={{ padding: 40, fontFamily: 'Verdana, sans-serif', fontSize: 13 }}>
      <p style={{ color: '#c62828' }}>{error}</p>
      <a href="/system/admin/blog" style={{ color: '#3b5998' }}>← Back to manager</a>
    </div>
  );

  if (!post) return (
    <div style={{ padding: 40, fontFamily: 'Verdana, sans-serif', fontSize: 13, color: '#65676b' }}>
      Loading...
    </div>
  );

  return <MarkdownEditor initialPost={post} />;
}
