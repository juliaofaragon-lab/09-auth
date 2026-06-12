import type { Metadata } from 'next';

import NoteForm from '@/components/NoteForm/NoteForm';
import { APP_NAME, getPageUrl, OG_IMAGE } from '@/lib/metadata';

import css from './CreateNote.module.css';

const title = `Create note | ${APP_NAME}`;
const description = 'Create a new note and save it to your NoteHub collection.';
const url = getPageUrl('/notes/action/create');

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    images: [OG_IMAGE],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
