export const hasItems = (items: unknown): boolean => Array.isArray(items) && Boolean(items.length);
