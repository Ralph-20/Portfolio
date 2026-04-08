import { getBlogPosts, getBlogTags } from '@/cms/getBlogContent';
import BlogCard from '@/components/elem/BlogCard';
import styles from './Blog.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Lucas Ralph',
  description:
    'Thoughts on AI agents, developer tooling, and building software that works while you sleep.',
  openGraph: {
    title: 'Blog — Lucas Ralph',
    description: 'Thoughts on AI agents, developer tooling, and building software.',
    type: 'website',
  },
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getBlogPosts(), getBlogTags()]);

  return (
    <section className={styles.blog}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>
          Thoughts on AI agents, developer tooling, and building software that works while you
          sleep.
        </p>
      </div>

      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
