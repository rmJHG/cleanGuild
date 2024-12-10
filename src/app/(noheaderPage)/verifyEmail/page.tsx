'use client';
import { useEffect, useState } from 'react';
import classes from './page.module.css';

import { errorModal } from '@/app/_lib/errorModal';
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '@/app/_components/layout/Loading';

function page({ searchParams }: { searchParams: { welcome: string } }) {
  const { data: session } = useSession();
  const welcome = searchParams.welcome;
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    // if (!welcome) redirect('/');
    async function verifyEmail() {
      if (!welcome) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/verifyEmail?welcome=${welcome}`
        );
        const json = await response.json();
        console.log(json);
        if (response.status === 200) {
          setVerificationStatus(`${json.message}`);

          session
            ? setTimeout(() => {
                signOut({ callbackUrl: '/' });
              }, 3000)
            : redirect('/');
        } else {
          errorModal(`${json.message}`);
        }
      } catch (error) {
        console.error(error);
        errorModal('이메일 인증에 실패했습니다. 다시 시도해주세요.');
      }
    }
    verifyEmail();
  }, []);
  return verificationStatus ? (
    <div className={classes.container}>
      <p>{verificationStatus}</p>
    </div>
  ) : (
    <div>
      <Loading />
    </div>
  );
}

export default page;
