import type { Metadata } from 'next';

import { APP_NAME, getPageUrl, OG_IMAGE } from '@/lib/metadata';

import css from './page.module.css';

const title = `Page not found | ${APP_NAME}`;
const description =
  'The requested NoteHub page does not exist or may have been moved.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: getPageUrl('/404'),
    images: [OG_IMAGE],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}
