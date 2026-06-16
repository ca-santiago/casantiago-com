'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './blog.css';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts?published=true')
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blog-page">
      <nav className="blog-topbar">
        <a href="/" className="blog-topbar-title">casantiago</a>
        <div className="blog-topbar-right">
          <a href="/">Home</a>
          <a href="/system/admin/blog">✎ Write</a>
        </div>
      </nav>

      <div className="blog-container">
        <div className="blog-header">
          <div className="blog-header-top">
            <h1>Blog</h1>
            <a href="/system/admin/blog" className="btn-write">✎ Write</a>
          </div>
          <p className="blog-subtitle">Thoughts and ideas</p>
        </div>

        {loading ? (
          <p style={{ fontFamily: 'Verdana, sans-serif', fontSize: 13, color: '#65676b' }}>
            Loading...
          </p>
        ) : posts.length === 0 ? (
          <div className="blog-empty">
            <p>Nothing here yet.</p>
            <a href="/system/admin/blog" className="btn-start">Write your first post →</a>
          </div>
        ) : (
          <div className="blog-list">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-item">
                {post.cover_image && (
                  <div className="blog-item-thumb">
                    <img src={post.cover_image} alt={post.title || ''} />
                  </div>
                )}
                <h2>{post.title}</h2>
                {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}
                <div className="blog-meta">
                  {post.publishedAt && (
                    <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  )}
                </div>
                {post.tags?.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((t) => <span key={t} className="post-tag">{t}</span>)}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
