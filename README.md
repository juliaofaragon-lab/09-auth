# NoteHub Auth

A notes application with cookie-based authentication, protected routes, user
profiles, and note management. Built with Next.js App Router, TypeScript,
Zustand, TanStack Query, Axios, and CSS Modules.

## Setup

1. Install dependencies with `npm install`.
2. Create `.env.local` and add:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. In Vercel, set `NEXT_PUBLIC_API_URL` to the deployed application URL.
4. Start the development server with `npm run dev`.

## Routes

- `/` - application overview
- `/notes` - redirects to the complete notes list
- `/notes/filter/all` - all notes
- `/notes/filter/[tag]` - notes filtered by tag
- `/notes/action/create` - create a note with a persisted draft
- `/notes/[id]` - full details on direct navigation
- `/notes/[id]` - modal preview when opened from a notes list
- `/sign-in` - user login
- `/sign-up` - user registration
- `/profile` - user profile
- `/profile/edit` - edit the username
