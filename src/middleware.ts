import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  console.log('pathname', pathname);
  // if (pathname.startsWith('/_next')) {
  //   return NextResponse.next();
  // }
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  const session = await auth();
  if (session) {
    if (pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (
      !session.user.handsData &&
      !pathname.startsWith('/user-auth') &&
      !pathname.startsWith('/_next') &&
      !pathname.startsWith('/signout')
    ) {
      return NextResponse.redirect(new URL('/user-auth', request.url));
    }

    if (pathname.startsWith('/user-auth') && session.user.handsData) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (pathname === '/post' || pathname === '/user-auth') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!find).*)', '/((?!test).*)'], // `/find`를 제외한 모든 경로
};
