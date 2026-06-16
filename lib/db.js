const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const initDb = async () => {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(255),
          content TEXT,
          excerpt TEXT,
          cover_image TEXT,
          tags TEXT[] DEFAULT '{}',
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "publishedAt" TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_publishedAt ON posts("publishedAt");
        CREATE INDEX IF NOT EXISTS idx_slug ON posts(slug);
        ALTER TABLE posts ALTER COLUMN title DROP NOT NULL;
        ALTER TABLE posts ALTER COLUMN content DROP NOT NULL;
        ALTER TABLE posts ADD COLUMN IF NOT EXISTS cover_image TEXT;
        ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
      `);
      console.log('Database initialized successfully');
    } finally {
      client.release();
    }
  } catch (error) {
    console.warn('Database initialization failed (will retry on first request):', error.message);
  }
};

// Initialize DB on first load (non-blocking)
if (!global.dbInitialized) {
  initDb();
  global.dbInitialized = true;
}

module.exports = pool;
