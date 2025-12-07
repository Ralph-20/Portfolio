import { ContentfulAsset, ContentfulImage } from '@/types';
import { ImageProps } from 'next/image';
import { ZodSchema } from 'zod';

export const extractFields = <T>(res: any): T => res.items[0]?.fields;

export const takeArray = <T>(arr: T[] | undefined): T[] => (Array.isArray(arr) ? arr : []);

export const take = <T>(value: T | undefined): T | null => (value === undefined ? null : value);

export const contentfulToNextImage = (image: ContentfulImage): ImageProps | null => {
  if (!image?.fields?.file?.url) {
    console.warn('Image is missing or has no URL');
    return null;
  }

  return {
    src: `https:${image.fields.file.url}`,
    alt: image.fields.title || image.fields.file.fileName || '',
    fill: true,
  };
};

/**
 * Returns a card-compatible image object with string src.
 * Use this for CardProps which expects { src: string; alt: string; ... }
 */
export const contentfulToCardImage = (
  image: ContentfulImage
): { src: string; alt: string; fill?: boolean; width?: number; height?: number } | null => {
  if (!image?.fields?.file?.url) {
    return null;
  }

  return {
    src: `https:${image.fields.file.url}`,
    alt: image.fields.title || image.fields.file.fileName || '',
    fill: true,
  };
};

export const contentfulToFile = (asset: ContentfulAsset | null | undefined) => {
  if (!asset?.fields?.file?.url) return null;

  return {
    url: `https:${asset.fields.file.url}`,
    fileName: asset.fields.file.fileName,
    contentType: asset.fields.file.contentType,
  };
};

export const parseContentfulEntry = async <T>(
  clientFetch: () => Promise<any>,
  schema: ZodSchema<T>,
  transform: (parsed: T) => any
): Promise<any | null> => {
  const res = await clientFetch();
  const raw = res?.items?.[0]?.fields;
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    console.error('Contentful validation failed:', parsed.error.format());
    return null;
  }

  return transform(parsed.data);
};

