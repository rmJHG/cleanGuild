'use client';

import classes from './page.module.css';
import { useFormState } from 'react-dom';
import postSignUpAction from './_lib/postSignupAction';
import { useEffect } from 'react';
import { errorModal } from '@/app/_lib/errorModal';
import { successModal } from '@/app/_lib/successModal';
import { useRouter } from 'next/navigation';

export default function Page() {
  const route = useRouter();
  const [state, formAction] = useFormState<{ message?: string; result?: string }, FormData>(
    postSignUpAction,
    {
      message: '',
    }
  );

  useEffect(() => {
    console.log(state, 'state');
    if (state.result) {
      successModal('회원가입이 완료되었습니다. 이메일 인증을 해주세요.', 3000);
      route.push('/');
    } else if (state.message) {
      errorModal(state.message || '서버 오류가 발생했습니다');
    }
  }, [state]);

  return (
    <div className={classes.signInContainer}>
      <div className={classes.titleContainer}>
        <h1>MAPLE GREMIO</h1>
      </div>
      <div className={classes.credentialsContainer}>
        <form action={formAction}>
          <input type="email" name="email" placeholder="이메일" autoComplete="off" />

          <input type="password" name="password" maxLength={16} placeholder="비밀번호" />
          <p>패스워드는 8~16자, 영문과 숫자만 입력이 가능합니다.</p>
          <input
            type="password"
            name="passwordDoubleCheck"
            maxLength={16}
            placeholder="비밀번호 확인"
          />
          <button>회원가입</button>
        </form>
      </div>
    </div>
  );
}
