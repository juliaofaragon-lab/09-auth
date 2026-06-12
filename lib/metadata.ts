export const APP_NAME = 'NoteHub';
export const APP_DESCRIPTION =
  'A simple application for creating, organizing, and browsing personal notes.';
export const OG_IMAGE =
  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export function getPageUrl(path: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    'http://localhost:3000';
  const normalizedBaseUrl = baseUrl.startsWith('http')
    ? baseUrl
    : `https://${baseUrl}`;

  return new URL(path, normalizedBaseUrl).toString();
}
