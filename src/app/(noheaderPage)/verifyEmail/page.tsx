'use client';

import { useEffect, useState } from 'react';
import classes from './page.module.css';
import Loading from '@/app/_components/layout/Loading';
import { useRouter } from 'next/navigation';
import { errorModal } from '@/app/_lib/errorModal';
import NormalLoading from '@/app/_components/layout/normalLoading';
import HandsRender from '@/app/_components/handsAuth/HandsRender';

export default function page({ searchParams }: { searchParams: { welcome: string } }) {
  const route = useRouter();
  const welcome = searchParams.welcome;
  const [verificationStatus, setVerificationStatus] = useState('이메일 인증이 완료되었습니다.');

  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(3);
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    if (!welcome) route.push('/');
    async function verifyEmail() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/verifyEmail?welcome=${welcome}`
        );
        setIsLoading(false);
        const json = await response.json();

        if (response.ok) {
          setVerificationStatus(json.message);
          setAccessToken(json.accessToken);
          return;
        }
        setVerificationStatus('실패');
      } catch (error) {
        setVerificationStatus('실패');
        errorModal('인증에 실패했습니다.');
      }
    }
    verifyEmail();
  }, []);

  const render = () => {
    switch (verificationStatus) {
      case '이메일 인증이 완료되었습니다.':
        setTimeout(() => {
          setTime(time - 1);
          if (time === 0) {
            // route.push('/hands');
          }
        }, 1000);
        return (
          <>
            <p>이메일 인증이 완료되었습니다.</p>
            <p>핸즈 인증 페이지로 이동합니다.</p>
            <p>
              <NormalLoading color="var(--header-color)" />
            </p>
          </>
        );
      case '이메일 인증 토큰이 만료됐습니다.':
        return (
          <>
            <p>이메일 인증 유효기한이 지났습니다.</p>
            <p>다시 로그인을 해서 인증해주세요.</p>
            <button
              onClick={async () => {
                route.push('/signin');
              }}
            >
              로그인 페이지
            </button>
          </>
        );
      case '이미 인증된 이메일입니다.':
        return (
          <>
            <p>잘못된 접근입니다.</p>
          </>
        );

      case '실패':
        return (
          <>
            <p>올바르지 않은 접근입니다.</p>
            <button onClick={() => route.push('/')}>메인으로</button>
          </>
        );
      default:
        return <Loading />;
    }
  };

  return (
    <div className={classes.container}>
      {time === 0 ? (
        <>
          <HandsRender accessToken={accessToken} />
        </>
      ) : (
        <div className={classes.innerContainer}>
          <div className={classes.titleContainer}>
            <h2>이메일 인증</h2>
          </div>
          <div className={classes.contentContainer}>{isLoading ? <Loading /> : render()}</div>
        </div>
      )}
    </div>
  );
}
