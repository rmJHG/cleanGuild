'use client';
import customFetch from '@/app/_lib/customFetch';
import classes from './page.module.css';
import { signOut, useSession } from 'next-auth/react';
import { useRef } from 'react';
import { errorModal } from '@/app/_lib/errorModal';
import { successModal } from '@/app/_lib/successModal';

export default function Page() {
  const { data: session, update } = useSession();

  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (password: string) => {
    // 비밀번호 형식 확인 (8~16자, 영문과 숫자 포함)
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(password);
  };

  const changeBtnHandler = async () => {
    if (
      !currentPasswordRef.current?.value ||
      !newPasswordRef.current?.value ||
      !newPasswordConfirmRef.current?.value
    ) {
      return errorModal('모든 항목을 입력해주세요.');
    }
    if (newPasswordRef.current?.value !== newPasswordConfirmRef.current?.value) {
      return errorModal('새 비밀번호가 일치하지 않습니다.');
    }
    if (!handlePasswordChange(newPasswordRef.current!.value)) {
      return errorModal('비밀번호는 8~16자, 영문과 숫자가 최소 한개씩 필요합니다.');
    }
    try {
      const res = await customFetch({
        url: `/api/v1/user/local/changePassword`,
        method: 'PATCH',
        body: JSON.stringify({
          email: session!.user.email,
          currentPassword: currentPasswordRef.current!.value,
          newPassword: newPasswordRef.current!.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        token: session!.user.accessToken,
        loginType: session!.user.loginType,
        update,
      });

      if (res.message === '비밀번호가 변경되었습니다.') {
        successModal('비밀번호가 변경되었습니다. 다시 로그인 해주세요.', 1000);
        await signOut({ callbackUrl: '/logoutRedirect' });
      }
      errorModal(res.message);
    } catch (error: any) {
      console.log(error, 'error');
      errorModal(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h2>비밀번호 변경</h2>
      </div>
      <div className={classes.changePwContainer}>
        <div>
          <span>현재 비밀번호</span>
          <input type="password" ref={currentPasswordRef} />
        </div>
        <div>
          <span>새 비밀번호</span>
          <input type="password" ref={newPasswordRef} />
          <span>패스워드는 8~16자, 영문과 숫자가 최소 한개씩 필요합니다.</span>
        </div>
        <div>
          <span>새 비밀번호 확인</span>
          <input type="password" ref={newPasswordConfirmRef} />
        </div>
      </div>
      <div className={classes.btnContainer}>
        <button onClick={changeBtnHandler}>
          <p>비밀번호 변경</p>
        </button>
      </div>
    </div>
  );
}
