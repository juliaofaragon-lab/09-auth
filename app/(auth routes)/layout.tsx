'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthRoutesLayoutProps {
  children: ReactNode;
}

export default function AuthRoutesLayout({ children }: AuthRoutesLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return children;
}
