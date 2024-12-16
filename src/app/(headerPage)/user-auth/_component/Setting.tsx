'use client';
import CharComponent from '@/app/_components/CharComponent';
import { Char } from '@/types/char';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import postMainCharAction from '../_lib/postMainCharAction';
import { signOut, useSession } from 'next-auth/react';
import classes from './setting.module.css';
import { successModal } from '@/app/_lib/successModal';
import { errorModal } from '@/app/_lib/errorModal';
import { useEffect } from 'react';
import customFetch from '@/app/_lib/customFetch';

type Props = {
  data: Char;
  img: File;
};

export default function Setting({ data, img }: Props) {
  const { data: session, update } = useSession();

  const { user } = session!;
  const route = useRouter();

  console.log(data);

  const fn = async () => {
    console.log(data);
    const formData = new FormData();
    formData.append('image', img);
    formData.append('ocid', data!.ocid);
    try {
      const res = await customFetch({
        url: `/api/v1/user/${user.loginType}/saveHandsImage`,
        method: 'POST',
        loginType: user.loginType,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: formData,
        token: user.accessToken,
        update,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <CharComponent data={data} />
      </div>

      <div className={classes.userCheckContainer}>
        <div>
          <p>본인의 메인캐릭터가 맞으신가요? 신중하게 선택해주세요.</p>
        </div>

        <div>
          <button
            onClick={() => {
              fn();
            }}
          >
            <p>맞아요^-^</p>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              route.push('/user-auth');
              setInterval(() => {
                window.location.reload();
              }, 100);
            }}
          >
            <p>아니요ㅠ_ㅠ</p>
          </button>
        </div>
      </div>
    </div>
  );
}
