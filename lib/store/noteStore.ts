import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CreateNoteData } from '@/types/note';

export const initialDraft: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteState {
  draft: CreateNoteData;
  setDraft: (note: Partial<CreateNoteData>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    },
  ),
);
