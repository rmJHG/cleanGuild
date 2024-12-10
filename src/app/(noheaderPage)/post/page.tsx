'use client';

import { useQueries } from '@tanstack/react-query';
import { getGuildData } from '../../_lib/getGuildData';
import { useSession } from 'next-auth/react';
import Loading from '@/app/_components/layout/Loading';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import getCooltime from '@/app/_lib/getCooltime';
import { useState } from 'react';
import GuildInfo from './_components/GuildInfo';
import LimitedInfo from './_components/LimitedInfo';
import PostContent from './_components/PostContent';
import classes from './page.module.css';
import ContactInfo from './_components/ContactInfo';

type Step = 1 | 2 | 3 | 4;

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
  const [pageState, setPageState] = useState<Step>(1);

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
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
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

  const guildData = queries[0].data as GuildData;
  const postCooltime = queries[1].data as number;
  const currentTime = new Date().getTime();
  const remainingTime = 10 * 60 * 1000 - (currentTime - postCooltime);

  console.log(currentTime, postCooltime, remainingTime, 'currentTime, postCooltime, remainingTime');
  if (guildData?.error) return <div>error {guildData.error.message}</div>;
  if (guildData === undefined || (postCooltime && undefined)) return <Loading />;

  // if (guildData.guild_master_name !== handsData.character_name)
  //   return (
  //     <div
  //       style={{
  //         minHeight: '100%',
  //         display: 'flex',
  //         alignContent: 'center',
  //         justifyContent: 'center',
  //         flex: '1',
  //       }}
  //     >
  //       <p>길드마스터만 홍보 가능합니다!</p>
  //     </div>
  //   );
  // if (remainingTime > 0) {
  //   const minutes = Math.floor(remainingTime / (60 * 1000)); // 남은 분 계산
  //   const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000); // 남은 초 계산

  //   return (
  //     <div
  //       style={{
  //         minHeight: '100%',
  //         display: 'flex',
  //         alignContent: 'center',
  //         justifyContent: 'center',
  //         flex: '1',
  //       }}
  //     >
  //       <p>
  //         게시글 쿨타임이 {minutes} 분 {seconds} 초 남았습니다.
  //       </p>
  //     </div>
  //   );
  // }
  const currentNoblePoint: number = guildData!.guild_noblesse_skill.reduce((a, b) => {
    return a + b.skill_level;
  }, 0);

  const handleNext = (nextStep: Step) => {
    setPageState(nextStep);
  };

  const handlePrev = (prevStep: Step) => {
    setPageState(prevStep);
  };

  const renderStep = () => {
    switch (pageState) {
      case 1:
        return (
          <GuildInfo guildData={{ ...guildData, currentNoblePoint }} onNext={() => handleNext(2)} />
        );
      case 2:
        return <LimitedInfo onNext={() => handleNext(3)} onPrev={() => handlePrev(1)} />;
      case 3:
        return (
          <ContactInfo
            onNext={() => handleNext(4)}
            onPrev={() => handlePrev(2)}
            guildMember={guildData.guild_member}
            guildMasterName={guildData.guild_master_name}
          />
        );
      case 4:
        return (
          <PostContent
            guildData={{ ...guildData, currentNoblePoint }}
            onPrev={() => handlePrev(3)}
          />
        );
    }
  };

  return <div className={classes.container}>{renderStep()}</div>;
}
