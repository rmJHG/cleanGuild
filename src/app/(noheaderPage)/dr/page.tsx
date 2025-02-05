'use client';

import { useRouter } from 'next/navigation';
import classes from './page.module.css';
import { signOut, useSession } from 'next-auth/react';
import { successModal } from '@/app/_lib/successModal';
import { useState } from 'react';

export default function Page() {
  const { data: session } = useSession();
  const [fetching, setFetching] = useState(false);

  if (!session) return null;

  const route = useRouter();
  const cancelDeleteRequest = async () => {
    setFetching(true);
    console.log(session?.user.loginType, session?.user.email);
    try {
      const cancelDeleteRequest = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${session?.user.loginType}/cancelDeleteUser`,
        {
          method: 'POST',
          body: JSON.stringify({ email: session.user.email }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const res = await cancelDeleteRequest.json();

      if (res.message === '탈퇴 취소 요청 성공') {
        successModal('회원탈퇴가 취소되었습니다.', 1000);
        setTimeout(async () => {
          await signOut({ callbackUrl: 'logoutRedirect' });
          route.push('/signin');
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signoutHandler = async () => {
    await signOut({ callbackUrl: 'logoutRedirect' });
  };
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.titleContainer}>
          <h1 className={classes.title}>회원탈퇴 대기중</h1>
        </div>
        <div className={classes.contentContainer}>
          <p className={classes.description}>
            {session?.user.email}님은 현재 회원탈퇴 대기중입니다.
          </p>
          <div className={classes.buttonContainer}>
            <button onClick={cancelDeleteRequest} disabled={fetching}>
              회원탈퇴 취소
            </button>
            <button onClick={signoutHandler}>로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  );
}
