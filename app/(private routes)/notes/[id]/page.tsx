import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import { fetchNoteById } from '@/lib/api/serverApi';
import { APP_NAME, getPageUrl, OG_IMAGE } from '@/lib/metadata';

import NoteDetailsClient from './NoteDetails.client';

export const dynamic = 'force-dynamic';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    const title = `${note.title} | ${APP_NAME}`;
    const description =
      note.content.trim() || `View the ${note.title} note in NoteHub.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: getPageUrl(`/notes/${id}`),
        images: [OG_IMAGE],
      },
    };
  } catch {
    return {
      title: `Note | ${APP_NAME}`,
      description: 'View note details in NoteHub.',
    };
  }
}

export default async function NoteDetails({ params }: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const noteQuery = {
    queryKey: ['note', id] as const,
    queryFn: () => fetchNoteById(id),
  };

  await queryClient.prefetchQuery(noteQuery);

  const queryState = queryClient.getQueryState(noteQuery.queryKey);
  if (queryState?.status === 'error') {
    throw queryState.error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
