'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const BlogEditor = dynamic(() => import('@/components/blog/Editor'), {
  ssr: false
});

const BlogPostCreator = () => {
  return (
    <div>
      <BlogEditor />
    </div>
  );
}

export default BlogPostCreator;
