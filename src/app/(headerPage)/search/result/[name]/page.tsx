'use client';

import { useQuery } from '@tanstack/react-query';
import classes from './page.module.css';
import Loading from '@/app/_components/layout/Loading';
import { GuildRanking } from '@/types/guildRanking';
import getGuildRank from '@/app/_lib/getGuildRank';
import SearchBar from '@/app/_components/SearchBar';
import SearchedChar from './_components/SearchedChar';
import SearchedGuild from './_components/SearchedGuild';
import getCharData from '@/app/_hook/getCharData';

export default function Page({ params }: { params: { name: string } }) {
  const { name } = params;
  console.log('Original name:', name); // 원래 name 값 확인

  const { data: charData, isLoading } = useQuery({
    queryKey: ['char', [decodeURI(name)]],
    queryFn: getCharData,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });

  const { data: guildsData } = useQuery<GuildRanking, Error, GuildRanking>({
    queryKey: ['guildsData', 0, 0, decodeURI(name)],
    queryFn: getGuildRank,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return (
    <div className={classes.container}>
      <SearchBar />

      <div className={classes.searchResultContainer}>
        <section className={classes.charContainer} aria-label="캐릭터 검색 결과">
          <h3>
            <b>{decodeURI(name)}</b> 캐릭터 검색결과
          </h3>
          <div>
            <p>최근 접속기록이 없거나 생성된지 하루가 지나지않은 캐릭터는 검색이 불가능합니다.</p>
          </div>

          <div
            style={{
              maxHeight: '200px',
              padding: '0',
              flex: '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {!isLoading ? <SearchedChar data={charData[0] || null} /> : <Loading />}
          </div>
        </section>

        <section className={classes.guildsContainer}>
          <h3>
            <b>{decodeURI(name)}</b> 길드 검색결과
          </h3>
          {guildsData ? (
            guildsData.ranking.length < 1 ? (
              <div className={classes.noResult}>
                <p>결과가 없습니다!</p>
              </div>
            ) : (
              <div>
                <ul className={classes.guildsList}>
                  {guildsData.ranking.map((e, i) => {
                    return <SearchedGuild key={e.guild_name + e.world_name} data={e} />;
                  })}
                </ul>
              </div>
            )
          ) : (
            <div className={classes.container}>
              <Loading />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
