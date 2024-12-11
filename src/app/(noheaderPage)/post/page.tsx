'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Loading from '@/app/_components/layout/Loading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import getCooltime from '@/app/_lib/getCooltime';
import Render from './_components/Render';

export default function Page() {
  const route = useRouter();
  const { data: session } = useSession();
  const { handsData } = session!.user;

  if (!handsData?.character_guild_name) {
    return (
      <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center' }}>
        <p>길드가 없으신 것 같네요! 구해보는건 어떨까요?</p>
        <Link href="/find">길드 구해보기</Link>
      </div>
    );
  }

  const { data } = useQuery({
    queryKey: ['postCooltime', handsData!.world_name, handsData!.character_guild_name],
    queryFn: getCooltime,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });

  const postCooltime = data;
  const currentTimestamp = new Date().getTime();
  if (!postCooltime) return <Loading />;

  const cooltimeDuration = 10 * 60 * 1000;
  const timeLeft = postCooltime + cooltimeDuration - currentTimestamp;
  if (timeLeft > 0) {
    const remainingSeconds = Math.ceil(timeLeft / 1000); // 남은 초 계산
    const minutes = Math.floor(remainingSeconds / 60); // 남은 분 계산
    const seconds = remainingSeconds % 60; // 남은 초 계산
    return (
      <div
        style={{
          minHeight: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flex: '1',
        }}
      >
        <p>길드홍보 쿨타임이 약 {minutes} 분 남았습니다.</p>
      </div>
    );
  }

  return <Render handsData={handsData} />;
}
