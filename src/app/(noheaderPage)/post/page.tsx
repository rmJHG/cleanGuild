'use client';

import { QueryKey, useQueries, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Loading from '@/app/_components/layout/Loading';
import Link from 'next/link';

import getCooltime from '@/app/_lib/getCooltime';
import Render from './_components/Render';
import { getGuildData } from '@/app/_lib/getGuildData';
import { useRouter } from 'next/navigation';
import classes from './page.module.css';
import getGuildManager from '@/app/_lib/getGuildManager';

export default function Page() {
  const { data: session, update } = useSession();
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
  const queries = useQueries({
    queries: [
      {
        queryKey: ['guildData', handsData.world_name, handsData.character_guild_name],
        queryFn: getGuildData,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['guildManager', handsData.world_name, handsData.character_guild_name],
        queryFn: ({ queryKey }: { queryKey: QueryKey }) =>
          getGuildManager({ queryKey }, { session, update }),
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
    ],
  });
  const { data: latestPostTime } = useQuery({
    queryKey: ['postCooltime', handsData.world_name, handsData.character_guild_name],
    queryFn: getCooltime,
    staleTime: 0,
    gcTime: 0,
  });

  const isLoading = queries.some((query) => query.isLoading);

  if (isLoading) {
    return <Loading />;
  }
  const guildData = queries[0].data;
  const guildManager = queries[1].data;

  console.log(guildManager, 'guildManager');
  if (
    guildData.guild_master_name !== handsData.character_name &&
    !guildManager.find((item: any) => item === session.user.ocid)
  )
    return (
      <div className={classes.onlyGuildMaster}>
        <p>길드마스터 또는 관리자만 홍보 가능합니다!</p>
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

  if (!latestPostTime) return <Render guildData={guildData} />;
  const currentTimestamp = new Date().getTime();
  const cooltimeDuration = 5 * 60 * 1000;
  const timeLeft = latestPostTime + cooltimeDuration - currentTimestamp;
  if (timeLeft > 0) {
    const remainingSeconds = Math.ceil(timeLeft / 1000); // 남은 초 계산
    const minutes = Math.floor(remainingSeconds / 60); // 남은 분 계산
    return (
      <div className={classes.cooltime}>
        <p>길드홍보 쿨타임이 약 {minutes} 분 남았습니다.</p>
        <button
          onClick={() => {
            route.back();
          }}
        >
          뒤로가기
        </button>
      </div>
    );
  }

  return <Render guildData={guildData} />;
}
