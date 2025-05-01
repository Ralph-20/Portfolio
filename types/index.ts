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
  image: TImageData;
};

