type SiteUrlEnvironment = Partial<Record<
  "NEXT_PUBLIC_SITE_URL" | "VERCEL_PROJECT_PRODUCTION_URL" | "VERCEL_URL",
  string
>>;

const LOCAL_SITE_URL = "http://localhost:3000";

function toHttpUrl(value: string | undefined): URL | undefined {
  const candidate = value?.trim();
  if (!candidate) return undefined;

  const normalized = /^[a-z][a-z\d+.-]*:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;

  try {
    const url = new URL(normalized);
    return url.protocol === "http:" || url.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

export function resolveSiteUrl(environment: SiteUrlEnvironment = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  VERCEL_URL: process.env.VERCEL_URL,
}): URL {
  const candidates = [
    environment.NEXT_PUBLIC_SITE_URL,
    environment.VERCEL_PROJECT_PRODUCTION_URL,
    environment.VERCEL_URL,
    LOCAL_SITE_URL,
  ];

  for (const candidate of candidates) {
    const url = toHttpUrl(candidate);
    if (url) return new URL(url.origin);
  }

  return new URL(LOCAL_SITE_URL);
}

export const siteUrl = resolveSiteUrl();
export const isLocalSiteUrl = siteUrl.origin === LOCAL_SITE_URL;
