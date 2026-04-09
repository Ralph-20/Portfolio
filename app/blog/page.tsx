import { getBlogPosts, getBlogTags } from '@/cms/getBlogContent';
import BlogCard from '@/components/elem/BlogCard';
import BlogAnimations from './BlogAnimations';
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
      <BlogAnimations />

      <div className={styles.header} data-blog-header>
        <p className={styles.eyebrow}>Writing</p>
        <h1 className={styles.title}>
          The <span>Blog</span>
        </h1>
        <p className={styles.subtitle}>
          Thoughts on AI agents, developer tooling, and building software that works while you
          sleep.
        </p>
      </div>

      <div className={styles.tags} data-blog-tags>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.divider} data-blog-divider />

      <div className={styles.grid}>
        {posts.map((post, i) => (
          <div key={post.slug} data-blog-card data-index={i}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
