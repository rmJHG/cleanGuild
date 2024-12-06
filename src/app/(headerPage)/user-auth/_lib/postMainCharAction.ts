"use server";

import { auth } from "@/auth";

interface CustomError extends Error {
  status: number;
  message: string;
}
export default async function postMainCharAction(preState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("인증 정보가 없습니다.");
  }
  try {
    const accessToken = session?.user.accessToken;

    const { loginType } = session.user;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${loginType}/saveHandsImage`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${session?.user.loginType}/saveHandsImage`);
    if (!res.ok) {
      const errorData = await res.json();
      if (errorData.message === "토큰이 만료되었습니다.") {
        return { status: 401, message: "토큰이 만료되었습니다." };
      }
      return { status: 400, message: `${errorData.message || "알 수 없는 오류가 발생했습니다"}` };
    }

    const data = await res.json();
    console.log(data);
    return { status: 200, message: "메인캐릭터가 등록되었습니다." };
  } catch (e) {
    return {
      status: (e as CustomError).status || 500,
      message: (e as CustomError).message || "서버 오류가 발생했습니다.",
    };
  }
}
