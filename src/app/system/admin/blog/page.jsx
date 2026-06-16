'use client';
import React, { useEffect, useState } from 'react';
import './admin.css';

const StatusBadge = ({ published }) => (
  <span className={published ? 'badge badge--published' : 'badge badge--draft'}>
    {published ? 'Published' : 'Draft'}
  </span>
);

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    fetch('/api/posts')
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d) ? d : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const togglePublish = async (post) => {
    const publishedAt = post.publishedAt ? null : new Date().toISOString();
    await fetch(`/api/posts/${post.slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publishedAt }),
    });
    load();
  };

  const remove = async (post) => {
    if (!window.confirm(`Delete "${post.title || 'Untitled'}"? This cannot be undone.`)) return;
    await fetch(`/api/posts/${post.slug}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="admin-wrap">
      <nav className="admin-topbar">
        <span className="admin-topbar-brand">casantiago / blog</span>
        <a href="/system/admin/blog/new" className="admin-btn-primary">✎ New Post</a>
      </nav>

      <div className="admin-container">
        <div className="admin-section-header">
          <h1>Posts</h1>
          <span className="admin-count">{posts.length} total</span>
        </div>

        {loading ? (
          <p className="admin-muted">Loading...</p>
        ) : posts.length === 0 ? (
          <div className="admin-empty">
            <p>No posts yet.</p>
            <a href="/system/admin/blog/new" className="admin-btn-primary">Write your first post</a>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td className="admin-td-title">
                    <a href={`/system/admin/blog/${post.slug}`}>
                      {post.title || <em>Untitled</em>}
                    </a>
                  </td>
                  <td>
                    <StatusBadge published={!!post.publishedAt} />
                  </td>
                  <td className="admin-td-date">
                    {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </td>
                  <td className="admin-td-actions">
                    <a href={`/system/admin/blog/${post.slug}`} className="admin-action">Edit</a>
                    <span className="admin-sep">·</span>
                    <button onClick={() => togglePublish(post)} className="admin-action">
                      {post.publishedAt ? 'Unpublish' : 'Publish'}
                    </button>
                    {post.publishedAt && (
                      <>
                        <span className="admin-sep">·</span>
                        <a href={`/blog/${post.slug}`} target="_blank" className="admin-action">View</a>
                      </>
                    )}
                    <span className="admin-sep">·</span>
                    <button onClick={() => remove(post)} className="admin-action admin-action--danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
