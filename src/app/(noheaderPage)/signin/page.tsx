'use client';

import signInWithCredential, { signInWithKaKao } from '@/app/_components/authActions';
import { useRouter } from 'next/navigation';
import classes from './page.module.css';
import { useEffect } from 'react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import KakaoSVG from '../../../../public/kakao.svg';

export default function Page() {
  const router = useRouter();
  const [state, formAction] = useFormState<{ message: string; email?: string }, FormData>(
    signInWithCredential,
    {
      message: '',
    }
  );

  useEffect(() => {
    console.log(state, 'state');
    if (state.message === '/authLoading') {
      (async () => {
        try {
          console.log('로그인중입니다');

          router.push(state.message);
        } catch (error) {
          console.error('세션 업데이트 중 오류:', error);
        }
      })();
    }
  }, [state]);
  return (
    <div className={classes.signInContainer}>
      <div className={classes.titleContainer}>
        <h1>CLEANGUILD</h1>
      </div>
      <div className={classes.credentialsContainer}>
        {state.message && state.message === '이메일 인증을 완료해주세요.' && (
          <span>
            이메일 인증을 완료해주세요
            <button style={{ textDecoration: 'underline' }}>
              <p>인증메일 재전송</p>
            </button>
          </span>
        )}
        {state.message && state.message === 'fetch failed' && <span>서버 에러</span>}
        {state.message && state.message !== '/authLoading' && <span>{state.message}</span>}

        <form action={formAction}>
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
          <button type="submit">
            <KakaoSVG width={25} height={25} />
            <p>카카오 로그인</p>
          </button>
        </form>
      </div>
    </div>
  );
}
