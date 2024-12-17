'use client';

import { useQuery } from '@tanstack/react-query';
import getGuildRank from '../../_lib/getGuildRank';
import Loading from '../layout/Loading';
import classes from './styles/GuildRankingTable.module.css';
import { GuildRanking } from '@/types/guildRanking';
import { useEffect, useState } from 'react';
import Link from 'next/link';
type Props = {
  ranking_type: string;
  world_name: string;
};

export default function GuildRankTable({ ranking_type, world_name }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const itemsPerPage = screenHeight > 950 ? 20 : 10;
  const { data } = useQuery<GuildRanking, Error, GuildRanking>({
    queryKey: ['guildRank', ranking_type, world_name, ''],
    queryFn: getGuildRank,
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });
  console.log(data);
  const currentItems = data && data.ranking.slice(currentPage, currentPage + itemsPerPage);

  useEffect(() => {
    // 화면 높이를 업데이트하는 함수
    const updateHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    // 컴포넌트가 마운트될 때 높이 설정
    updateHeight();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', updateHeight);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  // itemsPerPage가 변경될 때 currentPage 초기화
  useEffect(() => {
    setCurrentPage(0); // 또는 필요한 경우 현재 페이지를 조정
  }, [itemsPerPage]);

  return (
    <>
      <div className={classes.tableWrapper}>
        {data ? (
          <table className={classes.rankingTable}>
            <thead>
              <tr>
                <th>순위</th>
                <th>길드명</th>
                <th>점수</th>
              </tr>
            </thead>

            <tbody>
              {currentItems!.map((e) => {
                return (
                  <tr className={classes.guild} key={e.ranking + e.guild_name}>
                    <td style={{ fontWeight: '700', fontSize: '14px' }}>{e.ranking}</td>
                    <td className={classes.guildNameCell}>
                      <Link href={`/guild/${world_name}/${e.guild_name}`}>{e.guild_name}</Link>
                    </td>
                    <td>{e.guild_point.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              width: '100%',
              height: '330px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loading />
          </div>
        )}
      </div>

      <div className={classes.btnContainer}>
        {currentPage > 0 ? (
          <button
            onClick={() => {
              setCurrentPage(currentPage - itemsPerPage);
            }}
          >
            <span>이전</span>
          </button>
        ) : (
          <div></div>
        )}

        {currentPage + itemsPerPage < (data ? data.ranking.length : 0) && (
          <button
            onClick={() => {
              setCurrentPage(currentPage + itemsPerPage);
            }}
          >
            <span>다음</span>
          </button>
        )}
      </div>
    </>
  );
}
