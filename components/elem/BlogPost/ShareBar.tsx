'use client';

import { useState, useCallback } from 'react';
import type { BlogPost } from '@/types/blog';
import styles from './ShareBar.module.scss';

type ShareBarProps = {
  post: BlogPost;
};

function postToMarkdown(post: BlogPost): string {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tags = post.tags.map((t) => `\`${t}\``).join(' ');
  return `# ${post.title}\n\n*${date} — ${post.readingTime} min read*\n${tags}\n\n${post.content}`;
}

export default function ShareBar({ post }: ShareBarProps) {
  const [copied, setCopied] = useState<'link' | 'md' | null>(null);

  const copyLink = useCallback(async () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    await navigator.clipboard.writeText(url);
    setCopied('link');
    setTimeout(() => setCopied(null), 2000);
  }, [post.slug]);

  const copyMarkdown = useCallback(async () => {
    const md = postToMarkdown(post);
    await navigator.clipboard.writeText(md);
    setCopied('md');
    setTimeout(() => setCopied(null), 2000);
  }, [post]);

  return (
    <div className={styles.bar}>
      <button onClick={copyLink} className={styles.btn} title="Copy link to clipboard">
        {copied === 'link' ? 'Copied!' : 'Copy Link'}
      </button>
      <button onClick={copyMarkdown} className={styles.btn} title="Copy as Markdown (agent-friendly)">
        {copied === 'md' ? 'Copied!' : 'Copy as MD'}
      </button>
    </div>
  );
}
