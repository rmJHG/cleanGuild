'use client';

import { useQueries } from '@tanstack/react-query';
import { getGuildData } from '../../_lib/getGuildData';
import PostForm from './_component/PostForm';
import { useSession } from 'next-auth/react';
import Loading from '@/app/_components/layout/Loading';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import getCooltime from '@/app/_lib/getCooltime';

export default function Page() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) redirect('/signin');
  const { handsData } = session.user;

  if (!handsData?.character_guild_name) {
    return (
      <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center' }}>
        <p>길드가 없으신 것 같네요! 구해보는건 어떨까요?</p>
        <Link href="/find">길드 구해보기</Link>
      </div>
    );
  }

  const queries = useQueries({
    queries: [
      {
        queryKey: ['guildData', handsData!.world_name, handsData!.character_guild_name],
        queryFn: getGuildData,
        staleTime: 1 * 60 * 1000,
        gcTime: 3 * 60 * 1000,
      },
      {
        queryKey: ['postCooltime', handsData!.world_name, handsData!.character_guild_name],
        queryFn: getCooltime,
        staleTime: 1 * 60 * 1000,
        gcTime: 3 * 60 * 1000,
      },
    ],
  });
  console.log(queries[0].data, 'queries[0].data');
  console.log(queries[1].data, 'queries[1].data');
  const guildData = queries[0].data as GuildData;
  const postCooltime = queries[1].data as number;

  if (guildData?.error) return <div>error {guildData.error.message}</div>;

  if (guildData === undefined || (postCooltime && undefined)) return <Loading />;
  const currentNoblePoint: number = guildData!.guild_noblesse_skill.reduce((a, b) => {
    return a + b.skill_level;
  }, 0);

  // return (
  //   <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flex: '1' }}>
  //     <PostForm guildData={{ ...guildData, currentNoblePoint, postCooltime: postCooltime }} />;
  //   </div>
  // );
  if (guildData.guild_master_name === handsData.character_name) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flex: '1' }}>
        <PostForm guildData={{ ...guildData, currentNoblePoint, postCooltime: postCooltime }} />;
      </div>
    );
  } else {
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
        <p>길드마스터만 홍보 가능합니다!</p>
      </div>
    );
  }
  return <div>hello</div>;
}
