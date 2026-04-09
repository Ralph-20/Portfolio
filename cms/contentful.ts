import { createClient, type ContentfulClientApi } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID ?? '';
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN ?? '';

// Allow builds without Contentful credentials — CMS pages use defaults
export const contentfulClient: ContentfulClientApi<undefined> = (space && accessToken)
  ? createClient({ space, accessToken })
  : new Proxy({} as ContentfulClientApi<undefined>, {
      get(_target, prop) {
        if (prop === 'getEntries') return async () => ({ items: [], total: 0, skip: 0, limit: 0, sys: { type: 'Array' } });
        if (prop === 'getEntry') return async () => null;
        return undefined;
      },
    });

