'use client';
import React, { useState, useEffect, useRef } from 'react';
import MarkdownIt from 'markdown-it';
import './markdown.css';
import '../../app/blog/blog.css';

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

const makeSlug = (title) =>
  title.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') +
  '-' + Date.now().toString(36);

const stripMd = (text) =>
  (text || '').replace(/[#*`_>~\-\[\]()!]/g, '').replace(/\s+/g, ' ').substring(0, 160).trim();

const parseTags = (str) =>
  str.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);

const MarkdownEditor = ({ initialPost, onSave }) => {
  const isEdit = !!initialPost;
  const [title, setTitle] = useState(initialPost?.title || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [coverImage, setCoverImage] = useState(initialPost?.cover_image || '');
  const [tagsInput, setTagsInput] = useState((initialPost?.tags || []).join(', '));
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const previewTags = parseTags(tagsInput);

  const save = async (publish) => {
    if (publish && (!title.trim() || !content.trim())) {
      setStatus({ type: 'error', msg: 'Title and content are required before publishing.' });
      return;
    }

    setSaving(true);
    setStatus(null);

    const payload = {
      title: title.trim() || null,
      content: content || null,
      excerpt: stripMd(content),
      cover_image: coverImage.trim() || null,
      tags: parseTags(tagsInput),
    };

    try {
      let res, post;

      if (isEdit) {
        if (publish !== null) {
          payload.publishedAt = publish
            ? (initialPost.publishedAt || new Date().toISOString())
            : null;
        }
        res = await fetch(`/api/posts/${initialPost.slug}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        post = await res.json();
      } else {
        payload.slug = title.trim() ? makeSlug(title) : 'draft-' + Date.now().toString(36);
        payload.publishedAt = publish ? new Date().toISOString() : null;
        res = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        post = await res.json();
      }

      if (!res.ok) throw new Error(post.error || 'Failed to save');

      if (publish && post.slug) {
        setStatus({ type: 'success', msg: 'Published! Redirecting...' });
        setTimeout(() => { window.location.href = `/blog/${post.slug}`; }, 700);
      } else {
        setStatus({ type: 'success', msg: isEdit ? 'Saved.' : 'Draft saved.' });
        if (!isEdit && post.slug) {
          setTimeout(() => { window.location.href = `/system/admin/blog/${post.slug}`; }, 700);
        }
      }

      if (onSave) onSave(post);
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setSaving(false);
    }
  };

  const isPublished = !!initialPost?.publishedAt;

  // Auto-save for existing drafts
  const autoSaveTimer = useRef(null);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      try {
        const payload = {
          title: title.trim() || null,
          content: content || null,
          excerpt: stripMd(content),
          cover_image: coverImage.trim() || null,
          tags: parseTags(tagsInput),
        };
        const res = await fetch(`/api/posts/${initialPost.slug}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) setLastSaved(new Date());
      } catch (_) {}
    }, 2000);
    return () => clearTimeout(autoSaveTimer.current);
  }, [title, content, coverImage, tagsInput]); // eslint-disable-line

  return (
    <div className="editor-wrap">
      <div className="editor-topbar">
        <a href="/system/admin/blog" className="editor-topbar-brand">← Posts</a>
        <div className="editor-topbar-actions">
          {lastSaved && (
            <span className="editor-autosave-hint">
              saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button onClick={() => setPreview((p) => !p)} className="editor-btn-ghost">
            {preview ? '✎ Edit' : '👁 Preview'}
          </button>
          <button onClick={() => save(null)} disabled={saving} className="editor-btn-draft">
            {isEdit ? 'Save' : 'Save Draft'}
          </button>
          {isEdit && isPublished ? (
            <button onClick={() => save(false)} disabled={saving} className="editor-btn-unpublish">
              Take Offline
            </button>
          ) : (
            <button onClick={() => save(true)} disabled={saving} className="editor-btn-publish">
              {isEdit ? 'Publish' : 'Publish →'}
            </button>
          )}
        </div>
      </div>

      {preview ? (
        /* ---- Preview panel ---- */
        <div>
          {coverImage && (
            <div className="editor-cover-preview-full">
              <img src={coverImage} alt="Cover" />
            </div>
          )}
          <div className="editor-body">
            <h1 className="editor-preview-title">{title || 'Untitled'}</h1>
            {previewTags.length > 0 && (
              <div className="editor-preview-tags">
                {previewTags.map((t) => <span key={t} className="post-tag">{t}</span>)}
              </div>
            )}
            <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: md.render(content || '_Nothing to preview yet..._') }} />
          </div>
        </div>
      ) : (
        /* ---- Edit panel ---- */
        <div className="editor-body">

          {/* Cover image */}
          <div className="editor-field">
            <label className="editor-label">Cover image URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="editor-url-input"
            />
            {coverImage && (
              <div className="editor-cover-thumb">
                <img src={coverImage} alt="Cover preview" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="editor-title-input"
            autoFocus={!isEdit}
          />

          {/* Tags */}
          <div className="editor-field">
            <label className="editor-label">Tags <span className="editor-label-hint">(comma-separated)</span></label>
            <input
              type="text"
              placeholder="e.g. tech, life, coding"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="editor-tags-input"
            />
            {previewTags.length > 0 && (
              <div className="editor-tag-chips">
                {previewTags.map((t) => <span key={t} className="post-tag">{t}</span>)}
              </div>
            )}
          </div>

          {isEdit && (
            <div className="editor-meta">
              <span className={isPublished ? 'badge badge--published' : 'badge badge--draft'}>
                {isPublished ? 'Published' : 'Draft'}
              </span>
              {isPublished && (
                <a href={`/blog/${initialPost.slug}`} target="_blank" className="editor-view-link">
                  View post ↗
                </a>
              )}
            </div>
          )}

          {status && (
            <div className={`editor-status editor-status--${status.type}`}>{status.msg}</div>
          )}

          <div className="editor-content-area">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Write in Markdown...\n\n# Heading\n**bold**, _italic_, \`code\`\n\n- List item`}
              className="editor-textarea"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
