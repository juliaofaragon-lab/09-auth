'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';

import { createNote } from '@/lib/api/clientApi';
import { useNoteStore } from '@/lib/store/noteStore';
import type { CreateNoteData, NoteTag } from '@/types/note';

import css from './NoteForm.module.css';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      clearDraft();
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setDraft({ [name]: value } as Partial<CreateNoteData>);
  };

  const handleSubmit = async (formData: FormData) => {
    const note: CreateNoteData = {
      title: String(formData.get('title') ?? '').trim(),
      content: String(formData.get('content') ?? '').trim(),
      tag: String(formData.get('tag') ?? 'Todo') as NoteTag,
    };

    await mutation.mutateAsync(note);
  };

  const isTitleValid =
    draft.title.trim().length >= 3 && draft.title.trim().length <= 50;
  const isContentValid = draft.content.length <= 500;

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className={css.input}
          type="text"
          name="title"
          value={draft.title}
          onChange={handleChange}
          minLength={3}
          maxLength={50}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className={css.textarea}
          name="content"
          value={draft.content}
          onChange={handleChange}
          rows={8}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={css.select}
          name="tag"
          value={draft.tag}
          onChange={handleChange}
        >
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {mutation.isError && (
        <p className={css.error}>Could not create the note.</p>
      )}

      <div className={css.actions}>
        <button
          className={css.cancelButton}
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          className={css.submitButton}
          type="submit"
          disabled={mutation.isPending || !isTitleValid || !isContentValid}
        >
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
