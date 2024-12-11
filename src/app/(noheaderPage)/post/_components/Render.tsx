import { getGuildData } from '@/app/_lib/getGuildData';
import { HandsData } from '@/types/userData';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import GuildInfo from './GuildInfo';
import LimitedInfo from './LimitedInfo';
import ContactInfo from './ContactInfo';
import PostContent from './PostContent';
import classes from './_styles/render.module.css';
import Loading from '@/app/_components/layout/Loading';
import { useRouter } from 'next/navigation';
type Step = 1 | 2 | 3 | 4;

export default function Render({ handsData }: { handsData: HandsData }) {
  const route = useRouter();
  const [pageState, setPageState] = useState<Step>(1);

  const { data } = useQuery({
    queryKey: ['guildData', handsData!.world_name, handsData!.character_guild_name],
    queryFn: getGuildData,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const guildData = data as GuildData;
  console.log(guildData, 'guildData');

  if (guildData?.error) return <div>error {guildData.error.message}</div>;
  if (!guildData) return <Loading />;
  if (guildData.guild_master_name !== handsData.character_name)
    return (
      <div
        style={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          gap: '20px',
          flex: '1',
        }}
      >
        <p>길드마스터만 홍보 가능합니다!</p>
        <button
          style={{ color: 'white', fontSize: '1.5rem' }}
          onClick={() => {
            route.back();
          }}
        >
          뒤로가기
        </button>
      </div>
    );
  const currentNoblePoint: number = guildData!.guild_noblesse_skill.reduce((a, b) => {
    return a + b.skill_level;
  }, 0);
  const renderStep = () => {
    const handleNext = (nextStep: Step) => {
      setPageState(nextStep);
    };

    const handlePrev = (prevStep: Step) => {
      setPageState(prevStep);
    };
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
