import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const session = await auth();
  console.log("middleware session", session);
  if (!session) {
    return NextResponse.redirect(new URL("signin", request.url));
  }
  if (session && !session.user.isVerified && session.user.loginType !== "kakao") {
    // verify-email 페이지 자체에 대한 무한 리다이렉트 방지
    if (!request.nextUrl.pathname.startsWith("/checkEmail")) {
      return NextResponse.redirect(new URL("/checkEmail", request.url));
    }
  }

  // if (session) {
  //   // 로그인된 사용자가 signin, signup 페이지 접근 시 메인페이지로 리다이렉트
  //   if (request.nextUrl.pathname.startsWith("/signin") || request.nextUrl.pathname.startsWith("/signup")) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
  return NextResponse.next();
};

export const config = {
  matcher: ["/post", "/user-auth"],
};
