'use client';
import { serverListTest, ServerName } from '@/app/serverList';
import classes from './styles/topContainer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '../layout/Loading';
import { useQuery } from '@tanstack/react-query';
import { GuildRanking } from '@/types/guildRanking';
import getGuildRank from '@/app/_lib/getGuildRank';

export default function TopContainer({
  header,
  dataType,
}: {
  header: string;

  dataType: string;
}) {
  const { data, isLoading } = useQuery<GuildRanking, Error, GuildRanking>({
    queryKey: ['guildRank', dataType, '', ''],
    queryFn: getGuildRank,
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });

  if (!data) return null;

  const [a, b, c, d, e] = data.ranking.slice(0, 5);

  const getServerImage = (worldName: ServerName) => {
    return serverListTest[worldName]; // 기본 이미지 처리
  };

  const renderGuildInfo = (guild: any, size = 16) => {
    const serverImage = getServerImage(guild.world_name);

    return (
      <div className={classes.guildInfo}>
        <div className={classes.guildName}>
          <Link href={`/guild/${guild.world_name}/${guild.guild_name}`}>
            <Image
              src={serverImage}
              alt={guild.world_name}
              className={classes.serverImage}
              width={size}
              height={size}
            />
            <p>
              {guild.world_name} {guild.guild_name}
            </p>
          </Link>
        </div>
        <p className={classes.score}>{guild.guild_point.toLocaleString()}점</p>
      </div>
    );
  };
  return (
    <div className={classes.container}>
      <h3>{header}</h3>

      {isLoading ? (
        <div className={classes.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={classes.firstContainer}>
            <span>1.</span>
            {renderGuildInfo(a, 16)}
          </div>
          <div className={classes.anotherRankingContainer}>
            <div>
              <span>2.</span> {renderGuildInfo(b)}
            </div>
            <div>
              <span>3.</span> {renderGuildInfo(c)}
            </div>
            <div>
              <span>4.</span> {renderGuildInfo(d)}
            </div>
            <div>
              <span>5.</span> {renderGuildInfo(e)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
