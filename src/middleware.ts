import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const session = await auth();

  const pathname = request.nextUrl.pathname;
  // console.log('middleware session', session);

  if (session) {
    // 로그인된 사용자가 signin, signup 페이지 접근 시 메인페이지로 리다이렉트
    if (
      request.nextUrl.pathname.startsWith('/signin') ||
      request.nextUrl.pathname.startsWith('/signup')
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    //이메일 인증이 안됐을 경우 verifyEmail 페이지로 리다이렉트
    if (!session.user.isVerified) {
      return NextResponse.redirect(new URL('/verifyEmail', request.url));
    }
    //핸즈데이터가 있을 경우 메인페이지로 리다이렉트
    if (pathname === '/user-auth' && session.user.handsData) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    //이메일 인증이 됐거나 카카오 로그인으로 /checkEmail로 간 경우
    if (!session.user.isVerified && session.user.loginType === 'local') {
      // verify-email 페이지 자체에 대한 무한 리다이렉트 방지
      if (!request.nextUrl.pathname.startsWith('/checkEmail')) {
        return NextResponse.redirect(new URL('/checkEmail', request.url));
      }
    }
    return NextResponse.next();
  }

  if (pathname === '/post') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!find).*)'], // `/find`를 제외한 모든 경로
};
