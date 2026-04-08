import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/cms/getBlogContent';
import ShareBar from '@/components/elem/BlogPost/ShareBar';
import MarkdownRenderer from '@/components/elem/BlogPost/MarkdownRenderer';
import Link from 'next/link';
import styles from './BlogPost.module.scss';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} — Lucas Ralph`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={styles.article}>
      <Link href="/blog" className={styles.back}>
        &larr; Back to Blog
      </Link>

      <header className={styles.header}>
        <div className={styles.meta}>
          <time>{date}</time>
          <span>{post.readingTime} min read</span>
          <span>{post.author.name}</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      <ShareBar post={post} />

      <MarkdownRenderer content={post.content} />

      <footer className={styles.footer}>
        <ShareBar post={post} />
        <Link href="/blog" className={styles.back}>
          &larr; Back to Blog
        </Link>
      </footer>
    </article>
  );
}
