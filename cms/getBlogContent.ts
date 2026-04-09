'use cache';

import { cacheLife, cacheTag } from 'next/cache';
import { contentfulClient } from './contentful';
import type { BlogPost } from '@/types/blog';

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 250));
}

function mapEntry(entry: any): BlogPost {
  const fields = entry.fields;
  const content = fields.content ?? '';
  return {
    slug: fields.slug,
    title: fields.title,
    excerpt: fields.excerpt ?? '',
    content,
    publishedAt: fields.publishedAt,
    tags: fields.tags ?? [],
    coverImage: fields.coverImage
      ? {
          src: `https:${fields.coverImage.fields.file.url}`,
          alt: fields.coverImage.fields.title ?? fields.title,
          width: fields.coverImage.fields.file.details?.image?.width,
          height: fields.coverImage.fields.file.details?.image?.height,
        }
      : null,
    author: {
      name: fields.authorName ?? 'Lucas Ralph',
      avatar: fields.authorAvatar
        ? `https:${fields.authorAvatar.fields.file.url}`
        : undefined,
    },
    readingTime: estimateReadingTime(content),
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  cacheLife('max');
  cacheTag('blog');

  const response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    order: ['-fields.publishedAt'],
    limit: 100,
  });

  return response.items.map(mapEntry);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  cacheLife('max');
  cacheTag('blog', `blog-${slug}`);

  const response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  if (!response.items.length) return null;
  return mapEntry(response.items[0]);
}

export async function getBlogTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  const tagSet = new Set(posts.flatMap((p) => p.tags));
  return [...tagSet].sort();
}
