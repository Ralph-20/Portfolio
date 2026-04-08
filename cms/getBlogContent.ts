'use cache';

import { cacheLife, cacheTag } from 'next/cache';
import type { BlogPost } from '@/types/blog';

// --------------------------------------------------
// Mock blog data — structured to match Contentful
// Replace this file's body with Contentful queries
// when you're ready to go live.
// --------------------------------------------------

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 250));
}

const mockPosts: BlogPost[] = [
  {
    slug: 'building-brain-cli',
    title: 'Building brain-cli: A Personal Intelligence Layer',
    excerpt:
      'How I built a CLI that syncs my work context — meetings, PRs, tickets, Slack — into a queryable local database for AI agents.',
    content: `## The Problem

Every morning I'd open 5 tabs: Slack, Linear, GitHub, Granola, and my calendar. I'd spend 20 minutes piecing together what happened overnight, what's blocked, and what I should focus on.

## The Solution

\`brain-cli\` syncs all of those sources into \`~/.brain/\` — a local, queryable data layer. Now I run \`brain morning\` and get a briefing in seconds.

### Architecture

The CLI follows an adapter pattern. Each source (Slack, Linear, GitHub, Granola) implements a \`SourceAdapter\` interface:

\`\`\`typescript
interface SourceAdapter {
  name: string;
  fetch(cursor: string | null): Promise<SyncResult>;
  healthCheck(): Promise<{ ok: boolean; message: string }>;
}
\`\`\`

Data lands in date-partitioned directories under \`~/.brain/data/{source}/{YYYY-MM-DD}/\`.

### What I Learned

1. **Cursor-based sync is essential** — each adapter tracks where it left off
2. **Atomic writes prevent corruption** — write to temp file, fsync, rename
3. **Signal > noise** — the best feature isn't more data, it's better filtering

## What's Next

Cross-source signal tracking — detecting when the same topic appears in Slack, Linear, and a meeting. That's a strong signal worth surfacing.`,
    publishedAt: '2026-04-05T12:00:00Z',
    tags: ['ai', 'cli', 'developer-tools', 'typescript'],
    coverImage: null,
    author: { name: 'Lucas Ralph' },
    readingTime: 0,
  },
  {
    slug: 'overnight-agents-lessons',
    title: 'What I Learned Running AI Agents Overnight',
    excerpt:
      'Lessons from building an autonomous research system that runs while I sleep — and the failures that taught me the most.',
    content: `## The Idea

What if my AI agent could research topics, build prototypes, and have everything ready for me to review in the morning?

## Night One: Chaos

The first nightshift run spawned 12 parallel agents. They all competed for the same files, overwrote each other's work, and produced 300K tokens of mostly-duplicate output.

### What Went Wrong

- **No coordination** — agents didn't know about each other
- **No dedup** — same URLs fetched 4-5 times across agents
- **No budget** — no token limits, no time limits

## Night Twenty: Orchestration

After 20 iterations, the system now:

1. **Plans before executing** — a thin orchestrator scans context, creates an agenda
2. **Delegates to specialists** — each SDR agent owns one topic with dedicated sources
3. **Synthesizes across topics** — a final pass finds connections between findings
4. **Respects budgets** — time limits per agent, URL dedup across rounds

### The Key Insight

**Structural enforcement beats prompt engineering.** You can't prompt your way to reliable multi-agent coordination. You need code-level isolation, authority lines, and state management.

## Results

Average nightshift now produces 50-80 sources across 3-5 topics, with 2-3 actionable opportunities scored and ready for review.`,
    publishedAt: '2026-04-03T12:00:00Z',
    tags: ['ai', 'agents', 'automation', 'lessons-learned'],
    coverImage: null,
    author: { name: 'Lucas Ralph' },
    readingTime: 0,
  },
  {
    slug: 'portless-dev-workflow',
    title: 'Stop Memorizing Port Numbers: How portless Changed My Dev Workflow',
    excerpt:
      'Why I switched from localhost:3000 to myapp.localhost and never looked back — plus the new LAN mode for testing on real devices.',
    content: `## The Pain

\`EADDRINUSE\`. Again.

I had 3 Next.js apps, 2 API servers, and a dashboard all fighting over port 3000. My solution was a sticky note on my monitor with port assignments.

## Enter portless

\`portless\` gives each dev server a stable \`.localhost\` URL:

\`\`\`bash
portless myapp next dev      # -> https://myapp.localhost
portless api pnpm start      # -> https://api.localhost
portless docs next dev       # -> https://docs.localhost
\`\`\`

No port conflicts. No memorizing. No cookie clashes between apps.

### The Agent Angle

AI agents guess ports wrong constantly. With portless, they just use the name:

\`\`\`bash
portless get myapp  # -> https://myapp.localhost
\`\`\`

### LAN Mode (New in v0.10.0)

The newest feature lets you test on real devices:

\`\`\`bash
portless proxy start --lan
# Now myapp.local resolves on your phone too
\`\`\`

Uses mDNS to publish \`.local\` hostnames on your network. Perfect for React Native / Expo testing.

## Setup

\`\`\`bash
npm install -g portless
portless run next dev
# That's it. Proxy auto-starts.
\`\`\``,
    publishedAt: '2026-04-01T12:00:00Z',
    tags: ['developer-tools', 'dx', 'nextjs'],
    coverImage: null,
    author: { name: 'Lucas Ralph' },
    readingTime: 0,
  },
];

// Compute reading times
for (const post of mockPosts) {
  post.readingTime = estimateReadingTime(post.content);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  cacheLife('max');
  cacheTag('blog');
  // Sort newest first
  return [...mockPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  cacheLife('max');
  cacheTag('blog', `blog-${slug}`);
  return mockPosts.find((p) => p.slug === slug) ?? null;
}

export async function getBlogTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  const tagSet = new Set(posts.flatMap((p) => p.tags));
  return [...tagSet].sort();
}
