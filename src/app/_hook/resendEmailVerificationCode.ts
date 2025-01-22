export default async function resendEmailVerificationCode(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/resendEmailVerificationCode`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    const json = await res.json();
    return json;
  } catch (error) {
    throw error;
  }
}
