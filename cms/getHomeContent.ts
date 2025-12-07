'use cache';

import { contentfulClient } from './contentful';
import {
  HeroSchema,
  AboutSchema,
  SkillsSectionSchema,
  ExpertiseSectionSchema,
  PictureSectionSchema,
  ContactSectionSchema,
} from './schemas';
import {
  parseContentfulEntryFromRaw,
  takeArray,
  take,
  contentfulToNextImage,
  contentfulToCardImage,
  contentfulToFile,
} from './utils';
import { cacheLife, cacheTag } from 'next/cache';
import { ImageProps } from 'next/image';
import { CardProps, TImageData } from '@/types';

// ============================================
// Type definitions matching component props
// ============================================

type HeroContent = {
  primaryHeading: string;
  secondaryHeadings: string[];
  eyebrow: string;
  heroImg: TImageData;
};

type AboutContent = {
  headline: string;
  secondaryHead: string;
  description: string;
  image: ImageProps;
  cta: {
    label: string;
    href: string;
  };
};

type SkillsContent = {
  heading: string;
  cards: CardProps[];
};

type ExpertiseItem = {
  title: string;
  description: string;
  company?: string;
  period: string;
  location: string;
  icon?: string;
};

type ExpertiseContent = {
  headline: string;
  subHeadline?: string;
  items: ExpertiseItem[];
};

type PictureItem = {
  image: TImageData;
  description: string;
};

type GalleryContent = {
  heading: string;
  pictures: PictureItem[];
};

type ContactLink = {
  label: string;
  href?: string;
  download?: boolean;
  media?: {
    url: string;
    fileName: string;
    contentType: string;
  } | null;
};

type ContactContent = {
  heading: string;
  subHeading: string;
  links: ContactLink[];
};

export type HomeContent = {
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  expertise: ExpertiseContent;
  gallery: GalleryContent;
  contact: ContactContent;
};

// ============================================
// Default values for fallback
// ============================================

const defaultImage: ImageProps = {
  src: '/images/LJRDev.png',
  alt: 'Default image',
};

const defaultHero: HeroContent = {
  primaryHeading: 'Lucas Ralph',
  secondaryHeadings: [],
  eyebrow: 'Software Engineer',
  heroImg: defaultImage,
};

const defaultAbout: AboutContent = {
  headline: 'About Me',
  secondaryHead: '',
  description: '',
  image: defaultImage,
  cta: { label: 'Learn More', href: '#' },
};

const defaultSkills: SkillsContent = {
  heading: 'My Skills',
  cards: [],
};

const defaultExpertise: ExpertiseContent = {
  headline: 'Experience',
  subHeadline: undefined,
  items: [],
};

const defaultGallery: GalleryContent = {
  heading: 'Gallery',
  pictures: [],
};

const defaultContact: ContactContent = {
  heading: 'Contact',
  subHeading: "Let's connect",
  links: [],
};

// ============================================
// Main fetch function
// ============================================

/**
 * Fetches all home page content from Contentful.
 * Cached with 'home' tag for targeted revalidation.
 * Returns properly typed data with defaults for missing values.
 */
export async function getHomeContent(): Promise<HomeContent> {
  cacheLife('max');
  cacheTag('home');

  const res = await contentfulClient.getEntries({ include: 2 });

  const mapByType = res.items.reduce(
    (acc, entry) => {
      const contentTypeId = entry?.sys?.contentType?.sys?.id;
      if (!contentTypeId) return acc;
      acc[contentTypeId] = entry;
      return acc;
    },
    {} as Record<string, any>
  );

  // Parse Hero
  const heroRaw = parseContentfulEntryFromRaw(mapByType['heroSection'], HeroSchema, (data) => ({
    primaryHeading: take(data.primaryHeading) ?? defaultHero.primaryHeading,
    secondaryHeadings: takeArray(data.secHeads),
    eyebrow: take(data.eyebrow) ?? defaultHero.eyebrow,
    heroImg: defaultHero.heroImg, // Hero doesn't use image from CMS currently
  }));
  const hero: HeroContent = heroRaw ?? defaultHero;

  // Parse About
  const aboutRaw = parseContentfulEntryFromRaw(mapByType['aboutSection'], AboutSchema, (data) => ({
    headline: take(data.headline) ?? defaultAbout.headline,
    secondaryHead: take(data.subHeadline) ?? defaultAbout.secondaryHead,
    description: take(data.description) ?? defaultAbout.description,
    image: data.heroImg ? contentfulToNextImage(data.heroImg) ?? defaultImage : defaultImage,
    cta: {
      label: take(data.ctaLabel) ?? defaultAbout.cta.label,
      href: take(data.ctaHref) ?? defaultAbout.cta.href,
    },
  }));
  const about: AboutContent = aboutRaw ?? defaultAbout;

  // Parse Skills
  const skillsRaw = parseContentfulEntryFromRaw(
    mapByType['skills'],
    SkillsSectionSchema,
    (data) => ({
      heading: take(data.heading) ?? defaultSkills.heading,
      cards: takeArray(data.cards).map((entry): CardProps => {
        const fields = entry.fields ?? {};
        return {
          heading: take(fields.heading) ?? '',
          eyebrow: take(fields.eyebrow) ?? '',
          description: take(fields.description) ?? '',
          link: take(fields.link) ?? undefined,
          image: fields.image ? contentfulToCardImage(fields.image) : null,
        };
      }),
    })
  );
  const skills: SkillsContent = skillsRaw ?? defaultSkills;

  // Parse Expertise
  const expertiseRaw = parseContentfulEntryFromRaw(
    mapByType['expertise'],
    ExpertiseSectionSchema,
    (data) => ({
      headline: take(data.headline) ?? defaultExpertise.headline,
      subHeadline: take(data.subHeadline) ?? undefined,
      items: takeArray(data.items).map((entry): ExpertiseItem => {
        const fields = entry.fields ?? {};
        return {
          title: take(fields.title) ?? '',
          description: take(fields.description) ?? '',
          company: take(fields.company) ?? undefined,
          period: take(fields.period) ?? '',
          location: take(fields.location) ?? '',
          icon: undefined,
        };
      }),
    })
  );
  const expertise: ExpertiseContent = expertiseRaw ?? defaultExpertise;

  // Parse Contact
  const contactRaw = parseContentfulEntryFromRaw(
    mapByType['contactSection'],
    ContactSectionSchema,
    (data) => ({
      heading: take(data.heading) ?? defaultContact.heading,
      subHeading: take(data.subHeading) ?? defaultContact.subHeading,
      links: takeArray(data.links).map((entry): ContactLink => {
        const fields = entry?.fields ?? {};
        const media = fields.downloadFile ? contentfulToFile(fields.downloadFile) : null;
        return {
          label: take(fields.label) ?? '',
          href: take(fields.href) ?? undefined,
          download: fields.download ?? false,
          media,
        };
      }),
    })
  );
  const contact: ContactContent = contactRaw ?? defaultContact;

  // Parse Gallery
  const galleryRaw = parseContentfulEntryFromRaw(
    mapByType['gallerySection'],
    PictureSectionSchema,
    (data) => ({
      heading: take(data.heading) ?? defaultGallery.heading,
      pictures: takeArray(data.pictures).map((entry): PictureItem => {
        const fields = entry.fields ?? {};
        const image = fields.image ? contentfulToNextImage(fields.image) : null;
        return {
          image: image ?? defaultImage,
          description: take(fields.description) ?? '',
        };
      }),
    })
  );
  const gallery: GalleryContent = galleryRaw ?? defaultGallery;

  return {
    hero,
    about,
    skills,
    expertise,
    gallery,
    contact,
  };
}
