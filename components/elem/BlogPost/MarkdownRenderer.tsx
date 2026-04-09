'use client';

import styles from './MarkdownRenderer.module.scss';

type MarkdownRendererProps = {
  content: string;
};

/**
 * Simple markdown renderer that handles headings, code blocks, lists, and paragraphs.
 * Uses CSS-only syntax highlighting for code blocks.
 * Can be upgraded to remark/rehype later for richer rendering.
 */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = markdownToHtml(content);
  return <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />;
}

function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (```lang\n...\n```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escaped = escapeHtml(code.trim());
    return `<pre><code class="language-${lang ?? 'text'}">${escaped}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Paragraphs (lines not already wrapped in a block element)
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(h[1-6]|pre|ul|ol|li|blockquote|div)/.test(trimmed)) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join('\n');

  return html;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
