import { ContentfulAsset } from './index';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown content
  publishedAt: string; // ISO date
  updatedAt?: string;
  tags: string[];
  coverImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  } | null;
  author: {
    name: string;
    avatar?: string;
  };
  readingTime: number; // minutes
};

// Contentful content type shape (for future migration)
export type ContentfulBlogPost = {
  fields: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    updatedAt?: string;
    tags: string[];
    coverImage?: ContentfulAsset;
    authorName?: string;
    authorAvatar?: ContentfulAsset;
  };
};
