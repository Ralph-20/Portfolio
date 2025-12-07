import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Smart webhook endpoint for Contentful.
 *
 * Maps Contentful content types to cache tags and revalidates only affected content.
 *
 * Setup in Contentful:
 * 1. Go to Settings > Webhooks
 * 2. Create new webhook with URL: https://your-domain.com/api/revalidate
 * 3. Add header: x-revalidate-secret = your-secret
 * 4. Trigger on: Entry publish, Entry unpublish
 *
 * Add REVALIDATE_SECRET to your environment variables.
 */

// Map Contentful content type IDs to cache tags
const CONTENT_TYPE_TO_TAG: Record<string, string[]> = {
  // Header/Navigation
  navHeader: ['header'],
  navTab: ['header'],

  // Home page content
  heroSection: ['home'],
  aboutSection: ['home'],
  skills: ['home'],
  skillCard: ['home'],
  expertise: ['home'],
  expertiseItem: ['home'],
  gallerySection: ['home'],
  galleryImage: ['home'],
  contactSection: ['home'],
  contactLink: ['home'],

  // Future: Blog content (uncomment when you add blog)
  // blogPost: ['blog'],
  // blogCategory: ['blog'],
};

export async function POST(request: NextRequest) {
  try {
    // Verify the secret - ensure env var is set and matches provided value
    const expectedSecret = process.env.REVALIDATE_SECRET;
    const providedSecret = request.headers.get('x-revalidate-secret');

    if (!expectedSecret || !providedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // Parse Contentful webhook payload
    const payload = await request.json();

    // Contentful sends the content type in sys.contentType.sys.id
    const contentTypeId = payload?.sys?.contentType?.sys?.id;

    if (!contentTypeId) {
      // If we can't determine content type, revalidate everything
      // Using { expire: 0 } for immediate expiration since this is a webhook
      console.log('[Revalidate] No content type found, revalidating all tags');
      revalidateTag('header', { expire: 0 });
      revalidateTag('home', { expire: 0 });
      // revalidateTag('blog', { expire: 0 }); // Uncomment when you add blog

      return NextResponse.json({
        revalidated: true,
        tags: ['header', 'home'],
        reason: 'no-content-type',
      });
    }

    // Get the tags to revalidate for this content type
    const tagsToRevalidate = CONTENT_TYPE_TO_TAG[contentTypeId];

    if (!tagsToRevalidate || tagsToRevalidate.length === 0) {
      console.log(`[Revalidate] Unknown content type: ${contentTypeId}, skipping`);
      return NextResponse.json({
        revalidated: false,
        reason: `unknown-content-type: ${contentTypeId}`,
      });
    }

    // Revalidate each tag
    // Using { expire: 0 } for immediate expiration since this is a webhook
    for (const tag of tagsToRevalidate) {
      console.log(`[Revalidate] Revalidating tag: ${tag} (content type: ${contentTypeId})`);
      revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({
      revalidated: true,
      contentType: contentTypeId,
      tags: tagsToRevalidate,
    });
  } catch (error) {
    console.error('[Revalidate] Error:', error);
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}

// Also support GET for easy testing
export async function GET(request: NextRequest) {
  const providedSecret = request.nextUrl.searchParams.get('secret');
  const tag = request.nextUrl.searchParams.get('tag');

  // Verify the secret - ensure env var is set and matches provided value
  const expectedSecret = process.env.REVALIDATE_SECRET;
  if (!expectedSecret || !providedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ error: 'Missing tag parameter' }, { status: 400 });
  }

  const validTags = ['header', 'home']; // Add 'blog' when ready
  if (!validTags.includes(tag)) {
    return NextResponse.json({ error: `Invalid tag. Valid tags: ${validTags.join(', ')}` }, { status: 400 });
  }

  // Using { expire: 0 } for immediate expiration for manual testing
  revalidateTag(tag, { expire: 0 });
  console.log(`[Revalidate] Manual revalidation of tag: ${tag}`);

  return NextResponse.json({ revalidated: true, tag });
}

