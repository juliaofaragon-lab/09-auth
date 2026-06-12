import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getMe } from '@/lib/api/serverApi';
import { APP_NAME, getPageUrl, OG_IMAGE } from '@/lib/metadata';

import css from './ProfilePage.module.css';

const title = `Profile | ${APP_NAME}`;
const description = 'View your NoteHub profile information.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: getPageUrl('/profile'),
    images: [OG_IMAGE],
  },
};

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
