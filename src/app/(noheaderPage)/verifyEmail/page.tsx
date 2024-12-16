'use client';

import { useEffect, useState } from 'react';
import classes from './page.module.css';
import Loading from '@/app/_components/layout/Loading';
import { useRouter } from 'next/navigation';
function page({ searchParams }: { searchParams: { welcome: string } }) {
  const route = useRouter();
  const welcome = searchParams.welcome;
  const [verificationStatus, setVerificationStatus] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // if (!welcome) redirect('/');
    async function verifyEmail() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/verifyEmail?welcome=${welcome}`
        );
        setIsLoading(false);
        const json = await response.json();
        console.log(json);
        if (response.status === 200) {
          setVerificationStatus(json.message);
        }
        if (response.status === 401) {
          setVerificationStatus(json.message);
          setEmail(json.email);
        }
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    }
    verifyEmail();
  }, []);

  if (isLoading) return <Loading />;
  if (verificationStatus === '이메일 인증 토큰이 만료됐습니다.') {
    return (
      <div className={classes.container}>
        <p>{verificationStatus}</p>
        <button
          onClick={async () => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/resentEmailVerificationCode`,
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
            console.log(json);
          }}
        >
          인증메일 재발급 받기
        </button>
      </div>
    );
  }
  if (verificationStatus === '이미 인증된 이메일입니다.') {
    return (
      <div className={classes.container}>
        <p>잘못된 접근입니다.</p>
      </div>
    );
  }
  if (verificationStatus === '이메일 인증이 완료되었습니다.') {
    return (
      <div className={classes.container}>
        <p>{verificationStatus}</p>
        <button
          onClick={() => {
            route.push('/signin');
          }}
        >
          로그인 하기
        </button>
      </div>
    );
  }
}

export default page;
