export const locales = ["es", "ca"] as const;
export const defaultLocale = "es" as const;

export type Locale = (typeof locales)[number];
