import { NextResponse } from 'next/server';
import { getHomeContent } from '@/cms/getHomeContent';
import { getHeaderContent } from '@/cms/getHeaderContent';

/**
 * Debug endpoint to view all Contentful content.
 * Migrated from pages/api/index.ts
 */
export async function GET() {
  try {
    const [header, home] = await Promise.all([getHeaderContent(), getHomeContent()]);

    return NextResponse.json({
      header,
      ...home,
    });
  } catch (err) {
    console.error('Contentful API error:', err);
    return NextResponse.json({ error: 'Failed to fetch content from Contentful' }, { status: 500 });
  }
}

