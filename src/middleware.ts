import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const session = await auth();

  if (pathname.startsWith('/profile') && !session) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  //로그인 확인
  if ((pathname === '/post' || pathname === '/user-auth') && !session) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (session) {
    //회원탈퇴 확인
    if (!pathname.startsWith('/dr') && session.user.deleteRequest) {
      return NextResponse.redirect(new URL('/dr', request.url));
    }

    const exemptedPaths = ['/find', '/test', '/guild', '/search', '/privacy'];
    if (exemptedPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }
    //로그인 확인
    if (
      pathname.startsWith('/signin') ||
      pathname.startsWith('/signup') ||
      pathname.startsWith('/finduser')
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    //핸즈 확인
    if (
      !session.user.handsData &&
      !pathname.startsWith('/user-auth') &&
      !pathname.startsWith('/signout')
    ) {
      return NextResponse.redirect(new URL('/user-auth', request.url));
    }

    if (pathname.startsWith('/user-auth') && session.user.handsData) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!_next|static|favicon.ico|public|api|authLoading).*)', // _next, static, favicon.ico, public, api를 제외한 모든 경로
  ],
};
