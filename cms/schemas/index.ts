import { ContentfulAsset } from '@/types';
import { z } from 'zod';

// Header Schema

const TabItemFieldsSchema = z.object({
  label: z.string().optional(),
  href: z.string().optional(),
});

const TabItemSchema = z.object({
  fields: TabItemFieldsSchema,
});

const NavHeaderSchema = z.object({
  tabs: z.array(TabItemSchema).optional(),
});

// Hero Schema

const HeroSchema = z.object({
  primaryHeading: z.string().optional(),
  eyebrow: z.string().optional(),
  secHeads: z.array(z.string()).optional(),
});

// About Schema

const AboutSchema = z.object({
  headline: z.string().optional(),
  subHeadline: z.string().optional(),
  description: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  heroImg: z.custom<ContentfulAsset>().optional(),
});

// Skills Schema

const SkillCardFieldsSchema = z.object({
  heading: z.string().optional(),
  eyebrow: z.string().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
  image: z.custom<ContentfulAsset>().optional(), // standard Contentful asset
});

const SkillCardSchema = z.object({
  fields: SkillCardFieldsSchema,
});

const SkillsSectionSchema = z.object({
  heading: z.string().optional(),
  cards: z.array(SkillCardSchema).optional(),
});

// Expertise Section

const ExpertiseItemFieldsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  descriptionLong: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  period: z.string().optional(),
  link: z.string().optional(),
});

const ExpertiseItemSchema = z.object({
  // This is a workaround for the return type of the contentful client
  fields: ExpertiseItemFieldsSchema,
});

const ExpertiseSectionSchema = z.object({
  headline: z.string().optional(),
  subHeadline: z.string().optional(),
  items: z.array(ExpertiseItemSchema).optional(),
});

// Gallery Schema

const GalleryImageFieldsSchema = z.object({
  image: z.custom<ContentfulAsset>().optional(),
  description: z.string().optional(),
});

const GalleryImageSchema = z.object({
  // This is a workaround for the return type of the contentful client
  fields: GalleryImageFieldsSchema,
});

const PictureSectionSchema = z.object({
  heading: z.string().optional(),
  pictures: z.array(GalleryImageSchema).optional(),
});

// Contact Schema

const ContactLinkFieldsSchema = z.object({
  label: z.string().optional(),
  href: z.string().optional(),
  download: z.boolean().optional(),
  downloadFile: z.custom<ContentfulAsset>().optional(),
});

// This is a workaround for the return type of the contentful client
const ContactLinkSchema = z.object({
  fields: ContactLinkFieldsSchema,
});

const ContactSectionSchema = z.object({
  heading: z.string().optional(),
  subHeading: z.string().optional(),
  links: z.array(ContactLinkSchema).optional(),
});

export {
  TabItemFieldsSchema,
  TabItemSchema,
  NavHeaderSchema,
  HeroSchema,
  AboutSchema,
  SkillsSectionSchema,
  ExpertiseSectionSchema,
  PictureSectionSchema,
  ContactSectionSchema,
};

