'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const BlogEditor = dynamic(() => import('./Editor'), {
  ssr: false
});

import './local.css';

const BlogPostCreator = () => {
  return (
    <div>
      <BlogEditor />
    </div>
  );
}

export default BlogPostCreator;
