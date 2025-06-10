import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllContent } from '@/cms/getAllContent';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const content = await getAllContent();
    res.status(200).json(content);
  } catch (err) {
    console.error('Contentful API error:', err);
    res.status(500).json({ error: 'Failed to fetch content from Contentful' });
  }
}

