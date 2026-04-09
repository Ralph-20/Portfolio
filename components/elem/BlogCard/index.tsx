'use client';

import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import styles from './BlogCard.module.scss';

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.topRow}>
          <div className={styles.meta}>
            <time className={styles.date}>{date}</time>
            <span className={styles.readTime}>{post.readingTime} min read</span>
          </div>
          <span className={styles.arrow}>&rarr;</span>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.tags}>
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
