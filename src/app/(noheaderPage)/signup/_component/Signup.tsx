'use client';

import classes from './_styles/signup.module.css';
import { useFormState } from 'react-dom';

import { useEffect, useState } from 'react';
import { errorModal } from '@/app/_lib/errorModal';
import { successModal } from '@/app/_lib/successModal';
import { useRouter } from 'next/navigation';
import postSignUpAction from '../_lib/postSignupAction';

export default function SignUp({ onPrev }: { onPrev: (n: number) => void }) {
  const route = useRouter();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
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
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // 비밀번호 형식 확인 (8~16자, 영문과 숫자 포함)
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value);
    setPasswordValid(isValid);
  };
  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordCheck(value);
  };
  return (
    <div className={classes.signUpContainer}>
      <div className={classes.titleContainer}>
        <h1>MAPLE GREMIO</h1>
      </div>
      <div className={classes.credentialsContainer}>
        <form
          action={(formData) => {
            if (!formData.get('email')) return errorModal('이메일을 입력해주세요.');
            if (!formData.get('password')) return errorModal('비밀번호를 입력해주세요.');
            if (!passwordValid) return errorModal('비밀번호 형식이 올바르지 않습니다.');
            if (password !== passwordCheck) return errorModal('비밀번호가 일치하지 않습니다.');

            formAction(formData);
          }}
        >
          <div className={classes.inputContainer}>
            <input type="email" name="email" placeholder="이메일" autoComplete="off" />

            <input
              type="password"
              name="password"
              maxLength={16}
              placeholder="비밀번호"
              onChange={handlePasswordChange}
            />

            <p>패스워드는 8~16자, 영문과 숫자가 최소 한개씩 필요합니다.</p>
            {!passwordValid && password && (
              <p className={classes.error}>비밀번호 형식이 올바르지 않습니다.</p>
            )}
            <input
              type="password"
              name="passwordDoubleCheck"
              maxLength={16}
              placeholder="비밀번호 확인"
              onChange={handlePasswordCheckChange}
            />
            {password !== passwordCheck && passwordCheck && (
              <p className={classes.error}>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
          <div className={classes.btnContainer}>
            <button>화원가입</button>
            <button
              type="button"
              onClick={() => {
                onPrev(1);
              }}
            >
              뒤로가기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
