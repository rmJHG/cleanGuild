'use client';
import { FaCheck, FaUserSlash } from 'react-icons/fa6';
import classes from './page.module.css';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import customFetch from '@/app/_lib/customFetch';
import { successModal } from '@/app/_lib/successModal';

export default function Page() {
  const [ischecked, setIsChecked] = useState(false);

  const { data: session, update } = useSession();
  const route = useRouter();

  const handleDeleteUser = async () => {
    try {
      const res = await customFetch({
        method: 'POST',
        url: `/api/v1/user/${session!.user.loginType}/deleteUser`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user.email }),
        token: session!.user.accessToken,
        update,
        loginType: session!.user.loginType,
      });
      if (res.message === '탈퇴 요청 성공') {
        successModal(
          '탈퇴 요청이 성공적으로 진행되었습니다. 7일 후에 모든 데이터가 삭제됩니다.',
          2000
        );
        setTimeout(() => {
          signOut({ callbackUrl: '/signOut' });
          route.push('/');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.titleContainer}>
          <FaUserSlash size={24} color="white" />
          <h2>회원탈퇴</h2>
        </div>

        <div className={classes.contentContainer}>
          <div className={classes.checkList}>
            <p>
              MAPLEGREMIO에서 <span>{session?.user.email}</span>님의 회원탈퇴를 진행합니다.
            </p>
            <p>
              회원탈퇴를 요청하시면, 요청일로부터 7일 후에 모든 데이터가 삭제되고 탈퇴 처리가
              완료됩니다.
            </p>
            <p>이 기간 동안에는 탈퇴 요청을 취소할 수 있습니다.</p>
            <p>탈퇴시 이용정보와 유저정보가 삭제되고 복구가 불가능합니다.</p>
          </div>
          <div className={classes.checkboxContainer} onClick={() => setIsChecked(!ischecked)}>
            <div className={classes.checkbox}>
              {ischecked ? <FaCheck color="black" size={10} /> : <></>}
            </div>
            <p>위 사항을 확인했습니다.</p>
          </div>

          <div className={classes.btnContainer}>
            <button disabled={!ischecked} onClick={handleDeleteUser}>
              <p>진행하기</p>
            </button>
            <button onClick={() => route.back()}>
              <p>뒤로가기</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
