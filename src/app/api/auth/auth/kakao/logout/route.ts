import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.AUTH_KAKAO_ID}&redirect_uri=${process.env.NEXTAUTH_URL}/signout&response_type=code&prompt=login`;
    const kakaoLogoutUrl = "https://kapi.kakao.com/v1/user/logout";
    const response = await fetch(kakaoLogoutUrl);
    if (!response.ok) {
      throw new Error("카카오 로그아웃 실패");
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("카카오 로그아웃 에러:", error);
    return NextResponse.json({ status: "error", message: "로그아웃 처리 중 오류가 발생했습니다" }, { status: 500 });
  }
}
