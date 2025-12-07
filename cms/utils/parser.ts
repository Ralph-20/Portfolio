import { z } from 'zod';

export function parseContentfulEntryFromRaw<T, R>(
  raw: unknown,
  schema: z.ZodSchema<T>,
  transform: (parsed: T) => R
): R | null {
  const fields = (raw as { fields?: unknown })?.fields;
  const parsed = schema.safeParse(fields);
  if (!parsed.success) {
    console.error('Validation failed:', parsed.error.format());
    return null;
  }
  return transform(parsed.data);
}
