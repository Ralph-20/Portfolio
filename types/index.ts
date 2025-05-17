import { ImageProps } from 'next/image';
import { LinkProps } from 'next/link';

export type TImageData = ImageProps;

export type Tlink = LinkProps & {
  label: string;
};

export type CardProps = {
  heading: string;
  eyebrow: string;
  description: string;
  link?: string;
  image: {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
  } | null;
};

export type ContentfulAsset = {
  fields: {
    file: {
      url: string;
      fileName: string;
      contentType: string;
      details: {
        size?: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
    title?: string;
    description?: string;
  };
};

export type ContentfulImage = {
  fields: {
    file: {
      url: string;
      details: {
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
    title?: string;
  };
};

