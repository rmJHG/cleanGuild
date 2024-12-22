'use client';
import { getGuildData } from '@/app/_lib/getGuildData';
import { useQuery } from '@tanstack/react-query';
import classes from './page.module.css';
import Loading from '@/app/_components/layout/Loading';

import GuildUserImage from './_components/GuildUserImage';
import GuildMembers from './_components/GuildMembers';

import Image from 'next/image';
type Props = {
  params: {
    guildName: string;
    worldName: string;
  };
};
export default function Page({ params }: Props) {
  const { guildName, worldName } = params;
  const decodedWorldName = decodeURIComponent(worldName);
  const { data } = useQuery<GuildData, Error, GuildData>({
    queryKey: ['guildData', worldName, guildName],
    queryFn: getGuildData,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  function getRandomMembers(arr: string[]) {
    const memberCount = arr.length;
    if (memberCount <= 5) return arr;

    const selectedMembers: string[] = [];
    const indices = new Set();
    while (indices.size < 5) {
      const randomIndex = Math.floor(Math.random() * memberCount);
      indices.add(randomIndex);
    }
    indices.forEach((e) => {
      selectedMembers.push(arr[e as number]);
    });

    return selectedMembers;
  }
  if (!data) return <Loading />;

  const {
    guild_master_name,
    guild_member_count,
    guild_name,
    guild_noblesse_skill,
    guild_point,
    guild_member,
  } = data;
  const currentNoblePoint: number = guild_noblesse_skill.reduce((a, b) => {
    return a + b.skill_level;
  }, 0);

  const memberArr = guild_member.filter((e) => {
    return e !== guild_master_name;
  });
  const randomArr = getRandomMembers(memberArr);

  return (
    <div className={classes.container}>
      <div className={classes.guildHeaderContainer}>
        <div className={classes.guildNameWrapper}>
          <h2>{guild_name}</h2>
        </div>
        <div className={classes.charContainer}>
          <GuildUserImage guild_member_name={guild_master_name} transformScaleX="-1" />
          {/* {randomArr.map((e) => {
              return <GuildUserImage guild_member_name={e} transformScaleX="1" key={e} />;
            })} */}
        </div>
      </div>

      <div className={classes.guildInfoContainer}>
        <div className={classes.guildInfo}>
          <div>
            <span>길드 마스터</span>
          </div>
          <div>
            <span>{guild_master_name}</span>
          </div>
        </div>

        <div className={classes.guildInfoGap}></div>
        <div className={classes.guildInfo}>
          <div>
            <span>노블 포인트</span>
          </div>
          <div>
            <span>{currentNoblePoint}</span>
          </div>
        </div>
        <div className={classes.guildInfoGap}></div>

        <div className={classes.guildInfo}>
          <div>
            <span>길드원 수</span>
          </div>
          <div>
            <span>{guild_member_count}</span>
          </div>
        </div>
        <div className={classes.guildInfoGap}></div>

        <div className={classes.guildInfo}>
          <div>
            <span>길드 포인트</span>
          </div>
          <div>
            <span>{guild_point.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className={classes.guildMemberWrapper}>
        <GuildMembers memberArr={memberArr} master={guild_master_name} />
      </div>
    </div>
  );
}
