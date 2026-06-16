import MarkdownIt from 'markdown-it';
import pool from '@/../../lib/db';
import '../blog.css';

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

async function getPost(slug) {
  try {
    const result = await pool.query(
      'SELECT * FROM posts WHERE slug = $1 AND "publishedAt" IS NOT NULL',
      [slug]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post ? `${post.title} — casantiago` : 'Post not found',
    description: post?.excerpt || '',
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="blog-post-page">
        <nav className="blog-back-bar">
          <a href="/blog" className="blog-back">← Back to Blog</a>
        </nav>
        <div className="blog-post-container">
          <div className="blog-post" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontFamily: 'Verdana, sans-serif', color: '#65676b' }}>Post not found.</p>
            <a href="/blog" style={{ color: '#3b5998', fontFamily: 'Verdana, sans-serif', fontSize: 13 }}>← Back to blog</a>
          </div>
        </div>
      </div>
    );
  }

  const htmlContent = md.render(post.content);

  return (
    <article className="blog-post-page">
      <nav className="blog-back-bar">
        <a href="/blog" className="blog-back">← Back to Blog</a>
      </nav>

      {post.cover_image && (
        <div className="post-cover">
          <img src={post.cover_image} alt={post.title || ''} />
        </div>
      )}

      <div className="blog-post-container">
        <div className="blog-post">
          <header className="post-header">
            <h1>{post.title}</h1>
            <time className="post-date">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.tags?.length > 0 && (
              <div className="post-tags">
                {post.tags.map((t) => <span key={t} className="post-tag">{t}</span>)}
              </div>
            )}
          </header>

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </article>
  );
}
