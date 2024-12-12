'use server';

import { signIn, signOut, auth } from '../../auth';

export default async function signInWithCredential(
  prevState: {
    message: string;
    email?: string;
  },
  formData: FormData
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/authLoading',
    });
    console.log(res, 'res');
    if (res === `/authLoading`) {
      return { message: '/authLoading' };
    }

    if (!res || res.error) {
      return { message: res?.error || '로그인 실패' };
    }

    return { message: res };
  } catch (error: any) {
    console.log(error);
    if (error.cause?.err.message) {
      return { message: error.cause?.err.message, email };
    }

    return { message: error.message, email };
  }
}
export const signInWithKaKao = async () => {
  await signIn('kakao', { redirect: true, redirectTo: '/' });
};
export const signOutWithForm = async () => {
  await signOut();
};

export { auth as getSession };
