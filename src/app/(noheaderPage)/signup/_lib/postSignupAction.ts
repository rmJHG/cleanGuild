'use server';

export default async function postSignUpAction(prevState: any, formData: FormData) {
  console.log(formData);
  const email = formData.get('email');
  const password = formData.get('password');

  // 서버에 요청
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await res.json();

    if (!json || json.error) {
      return json.error || '로그인 실패';
    }

    return json;
  } catch (error: any) {
    if (error.cause?.err.message) {
      return error.cause?.err.message;
    }

    return error.message;
  }
}
