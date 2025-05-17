export function parseContentfulEntryFromRaw<T>(
  raw: any,
  schema: Zod.ZodSchema<T>,
  transform: (parsed: T) => any
): any | null {
  const fields = raw?.fields;
  const parsed = schema.safeParse(fields);
  if (!parsed.success) {
    console.error('Validation failed:', parsed.error.format());
    return null;
  }
  return transform(parsed.data);
}
