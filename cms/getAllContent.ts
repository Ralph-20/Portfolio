import { contentfulClient } from './contentful';
import {
  NavHeaderSchema,
  HeroSchema,
  AboutSchema,
  SkillsSectionSchema,
  PictureSectionSchema,
  ContactSectionSchema,
  ExpertiseSectionSchema,
} from './schemas';
import {
  parseContentfulEntryFromRaw,
  take,
  takeArray,
  contentfulToNextImage,
  contentfulToFile,
} from './utils';

export const getAllContent = async () => {
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

  return {
    header: parseContentfulEntryFromRaw(mapByType['navHeader'], NavHeaderSchema, (data) => ({
      tabs: takeArray(data.tabs).map((entry) => {
        const fields = entry?.fields ?? {};
        return {
          label: take(fields.label),
          href: take(fields.href),
        };
      }),
    })),
    hero: parseContentfulEntryFromRaw(mapByType['heroSection'], HeroSchema, (data) => ({
      ...data,
      secHeads: takeArray(data.secHeads),
    })),

    about: parseContentfulEntryFromRaw(mapByType['aboutSection'], AboutSchema, (data) => ({
      headline: take(data.headline),
      subHeadline: take(data.subHeadline),
      description: take(data.description),
      cta: {
        label: take(data.ctaLabel),
        href: take(data.ctaHref),
      },
      image: data.heroImg ? contentfulToNextImage(data.heroImg) : null,
    })),

    skills: parseContentfulEntryFromRaw(mapByType['skills'], SkillsSectionSchema, (data) => ({
      heading: take(data.heading),
      cards: takeArray(data.cards).map((entry) => {
        const fields = entry.fields ?? {};
        return {
          heading: take(fields.heading),
          eyebrow: take(fields.eyebrow),
          description: take(fields.description),
          link: take(fields.link),
          image: fields.image ? contentfulToNextImage(fields.image) : null,
        };
      }),
    })),

    expertise: parseContentfulEntryFromRaw(
      mapByType['expertise'],
      ExpertiseSectionSchema,
      (data) => ({
        headline: take(data.headline),
        subHeadline: take(data.subHeadline),
        items: takeArray(data.items).map((entry) => {
          const fields = entry.fields ?? {};
          return {
            title: take(fields.title),
            description: take(fields.description),
            descriptionLong: take(fields.descriptionLong),
            company: take(fields.company),
            location: take(fields.location),
            period: take(fields.period),
            link: take(fields.link),
          };
        }),
      })
    ),

    contact: parseContentfulEntryFromRaw(
      mapByType['contactSection'],
      ContactSectionSchema,
      (data) => ({
        heading: take(data.heading),
        subHeading: take(data.subHeading),
        links: takeArray(data.links).map((entry) => {
          const fields = entry?.fields ?? {};
          return {
            label: take(fields.label),
            href: take(fields.href),
            download: fields.download ?? false,
            media: fields.downloadFile ? contentfulToFile(fields.downloadFile) : null,
          };
        }),
      })
    ),

    gallery: parseContentfulEntryFromRaw(
      mapByType['gallerySection'],
      PictureSectionSchema,
      (data) => ({
        heading: take(data.heading),
        pictures: takeArray(data.pictures).map((entry) => {
          const fields = entry.fields ?? {};
          return {
            image: fields.image
              ? contentfulToNextImage(fields.image)
              : {
                  src: '',
                  alt: '',
                  fill: false,
                  width: undefined,
                  height: undefined,
                },
            description: take(fields.description),
          };
        }),
      })
    ),
  };
};

