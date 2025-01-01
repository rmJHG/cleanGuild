'use client';

import signInWithCredential, { signInWithKaKao } from '@/app/_components/authActions';
import { useRouter, useSearchParams } from 'next/navigation';
import classes from './page.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import KakaoSVG from '../../../../public/kakao.svg';
import { errorModal } from '@/app/_lib/errorModal';
import { successModal } from '@/app/_lib/successModal';

type LocalLoginState = {
  message: string;
  email?: string;
};

export default function Page() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const params = useSearchParams();
  console.log(params.get('error'));
  const [localLoginState, localLoginFormAction] = useFormState<LocalLoginState, FormData>(
    signInWithCredential,
    {
      message: '',
    }
  );

  useEffect(() => {
    console.log(localLoginState, 'localLoginState');
    if (localLoginState.message === '/authLoading') {
      (async () => {
        try {
          console.log('로그인중입니다');

          router.push(localLoginState.message);
        } catch (error) {
          console.error('세션 업데이트 중 오류:', error);
        }
      })();
    }
    if (localLoginState.email) {
      setEmail(localLoginState.email);
    }
  }, [localLoginState]);

  useEffect(() => {
    if (params.get('error')) {
      errorModal(params.get('error') as string);
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      window.history.replaceState({}, '', url.toString());
    }
  }, [params]);
  return (
    <div className={classes.signInContainer}>
      <div className={classes.titleContainer}>
        <h1>MAPLE GREMIO</h1>
      </div>
      <div className={classes.credentialsContainer}>
        {localLoginState.message && localLoginState.message === '이메일 인증을 완료해주세요.' && (
          <span>
            이메일 인증을 완료해주세요
            <button
              style={{ textDecoration: 'underline', textUnderlineOffset: '0.2rem' }}
              onClick={async () => {
                try {
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
                  successModal('인증메일을 재전송했습니다.', 1000);
                  console.log(json);
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <p>인증메일 재전송</p>
            </button>
          </span>
        )}
        {localLoginState.message && localLoginState.message === 'fetch failed' && (
          <span>서버 에러</span>
        )}
        {localLoginState.message &&
          localLoginState.message !== '/authLoading' &&
          localLoginState.message !== 'fetch failed' &&
          localLoginState.message !== '이메일 인증을 완료해주세요.' && (
            <span>{localLoginState.message}</span>
          )}

        <form action={localLoginFormAction}>
          <input type="email" name="email" placeholder="이메일" autoComplete="off" />
          <input type="password" name="password" placeholder="비밀번호" />
          <button type="submit">로그인</button>
        </form>
      </div>
      <div className={classes.accountLinksContainer}>
        <p>아직 회원이 아니신가요?</p>
        <Link href="/signup">
          <p>회원가입</p>
        </Link>
      </div>
      <div className={classes.kakaoLoginContainer}>
        <form action={signInWithKaKao}>
          <button>
            <KakaoSVG width={25} height={25} />
            <p>카카오 로그인</p>
          </button>
        </form>
      </div>
    </div>
  );
}
