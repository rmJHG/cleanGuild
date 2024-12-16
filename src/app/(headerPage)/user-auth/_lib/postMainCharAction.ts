'use server';

import { auth, unstable_update } from '@/auth';
import { cookies } from 'next/headers';

interface CustomError extends Error {
  status: number;
  message: string;
}
export default async function postMainCharAction(preState: any, formData: FormData) {
  const session = await auth();

  try {
    await unstable_update({
      user: {
        email: 'helloworld@hello.world',
      },
    });
    console.log(session, 'update');
  } catch (error) {
    console.error(error);
  }

  if (!session?.user) {
    throw new Error('인증 정보가 없습니다.');
  }
  try {
    const accessToken = session?.user.accessToken;
    const refreshToken = cookies().get('_Loya');
    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다. 다시 로그인 해주세요.');
    }

    const { loginType } = session.user;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${loginType}/saveHandsImage`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-refresh-token': refreshToken.value,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      if (errorData.message === '카카오 토큰 인증에 실패했습니다.') {
        console.log(session);
        return { status: 401, message: errorData.message };
      }
      if (errorData.message === '토큰이 만료되었습니다.') {
        return { status: 401, message: '토큰이 만료되었습니다.' };
      }
      if (errorData.message === '이미 등록된 캐릭터입니다.') {
        return { status: 409, message: '이미 등록된 캐릭터입니다.' };
      }
      return { status: 400, message: `${errorData.message || '알 수 없는 오류가 발생했습니다'}` };
    }

    const data = await res.json();
    console.log(data);
    return { status: 200, message: '메인캐릭터가 등록되었습니다.' };
  } catch (e) {
    return {
      status: (e as CustomError).status || 500,
      message: (e as CustomError).message || '서버 오류가 발생했습니다.',
    };
  }
}
