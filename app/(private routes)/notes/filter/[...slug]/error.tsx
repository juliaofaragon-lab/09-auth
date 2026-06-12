'use client';

interface FilteredNotesErrorProps {
  error: Error;
  reset: () => void;
}

export default function FilteredNotesError({ reset }: FilteredNotesErrorProps) {
  return (
    <div>
      <p>Could not fetch the list of notes.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
