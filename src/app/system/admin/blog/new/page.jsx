'use client';
import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(() => import('@/components/blog/MarkdownEditor'), { ssr: false });

export default function NewPost() {
  return <MarkdownEditor />;
}
