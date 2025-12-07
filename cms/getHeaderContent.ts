'use cache';

import { contentfulClient } from './contentful';
import { NavHeaderSchema } from './schemas';
import { parseContentfulEntryFromRaw, takeArray, take } from './utils';
import { cacheLife, cacheTag } from 'next/cache';
import { Tlink } from '@/types';

type HeaderContent = {
  tabs: Tlink[];
};

/**
 * Fetches header/navigation content from Contentful.
 * Cached with 'header' tag for targeted revalidation.
 */
export async function getHeaderContent(): Promise<HeaderContent> {
  cacheLife('max'); // Cache for maximum duration (effectively 30 days)
  cacheTag('header');

  const res = await contentfulClient.getEntries({
    content_type: 'navHeader',
    include: 2,
    limit: 1,
  });

  const entry = res.items[0];

  if (!entry) {
    return { tabs: [] };
  }

  const result = parseContentfulEntryFromRaw(entry, NavHeaderSchema, (data) => {
    const tabs: Tlink[] = takeArray(data.tabs)
      .map((tabEntry) => {
        const fields = tabEntry?.fields ?? {};
        const label = take(fields.label);
        const href = take(fields.href);

        // Filter out tabs with missing required fields
        if (!label || !href) return null;

        return { label, href } as Tlink;
      })
      .filter((tab): tab is Tlink => tab !== null);

    return { tabs };
  });

  // Ensure we always return a valid HeaderContent
  if (!result) {
    return { tabs: [] };
  }

  return result;
}

