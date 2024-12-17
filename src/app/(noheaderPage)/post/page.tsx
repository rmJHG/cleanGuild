'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Loading from '@/app/_components/layout/Loading';
import Link from 'next/link';

import getCooltime from '@/app/_lib/getCooltime';
import Render from './_components/Render';
import { getGuildData } from '@/app/_lib/getGuildData';
import { useRouter } from 'next/navigation';
import classes from './page.module.css';
export default function Page() {
  const { data: session } = useSession();
  if (!session) return <Loading />;
  const { handsData } = session!.user;
  const route = useRouter();
  if (!handsData?.character_guild_name) {
    return (
      <div className={classes.noGuild}>
        <p>길드가 없으신 것 같네요! 구해보는건 어떨까요?</p>
        <Link href="/find">길드 구해보기</Link>
      </div>
    );
  }
  const { data: guildData } = useQuery({
    queryKey: ['guildData', handsData!.world_name, handsData!.character_guild_name],
    queryFn: getGuildData,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
  const { data } = useQuery({
    queryKey: ['postCooltime', handsData!.world_name, handsData!.character_guild_name],
    queryFn: getCooltime,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });

  if (guildData?.error) return <div>error {guildData.error.message}</div>;
  if (!guildData) return <Loading />;
  if (guildData.guild_master_name !== handsData.character_name)
    return (
      <div className={classes.onlyGuildMaster}>
        <p>길드마스터만 홍보 가능합니다!</p>
        <button
          style={{ fontSize: '1.5rem' }}
          onClick={() => {
            route.back();
          }}
        >
          뒤로가기
        </button>
      </div>
    );

  const postCooltime = data;
  const currentTimestamp = new Date().getTime();
  if (!postCooltime) return <Loading />;

  const cooltimeDuration = 5 * 60 * 1000;
  const timeLeft = postCooltime + cooltimeDuration - currentTimestamp;
  if (timeLeft > 0) {
    const remainingSeconds = Math.ceil(timeLeft / 1000); // 남은 초 계산
    const minutes = Math.floor(remainingSeconds / 60); // 남은 분 계산
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
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

  return <Render guildData={guildData} />;
}
