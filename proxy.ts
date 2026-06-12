import { NextResponse, type NextRequest } from 'next/server';

import { checkSession } from '@/lib/api/serverApi';

const privateRoutes = ['/notes', '/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

function addSessionCookies(
  response: NextResponse,
  setCookieHeader?: string | string[],
) {
  if (!setCookieHeader) {
    return response;
  }

  const cookies = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  cookies.forEach((cookie) => {
    response.headers.append('set-cookie', cookie);
  });

  return response;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isPrivateRoute && !isPublicRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  let isAuthenticated = Boolean(accessToken);
  let setCookieHeader: string | string[] | undefined;

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession(
        request.headers.get('cookie') ?? '',
      );
      isAuthenticated = sessionResponse.data.success;
      setCookieHeader = sessionResponse.headers['set-cookie'];
    } catch {
      isAuthenticated = false;
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicRoute && isAuthenticated) {
    return addSessionCookies(
      NextResponse.redirect(new URL('/', request.url)),
      setCookieHeader,
    );
  }

  return addSessionCookies(NextResponse.next(), setCookieHeader);
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};
