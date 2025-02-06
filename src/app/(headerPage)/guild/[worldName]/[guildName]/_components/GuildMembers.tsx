import { useQueries, useQuery } from '@tanstack/react-query';
import classes from './_styles/guildMembers.module.css';

import { Char } from '@/types/char';
import Image from 'next/image';
import getCharData from '@/app/_hook/getCharData';
import Loading from '@/app/_components/layout/Loading';

import { FaCrown } from 'react-icons/fa';
import { useState } from 'react';

type Props = {
  memberArr: string[];
  master: string;
};
const chunk = (array: string[], size: number) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};
export default function GuildMembers({ memberArr, master }: Props) {
  const memberChunks = chunk(memberArr, 30);
  const { data: guildMaster, isLoading: guildMasterLoading } = useQuery<Char[], Error, Char[]>({
    queryKey: ['char', [master]],
    queryFn: getCharData,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  const guildmaterData = guildMaster && guildMaster[0];

  const queries = useQueries({
    queries: memberChunks.map((e) => {
      return {
        queryKey: ['char', e],
        queryFn: getCharData,
      };
    }),
  });

  const isLoading = queries.some((q) => q.isLoading || q.isFetching);
  const allData = queries.flatMap((q) => q.data || []);
  const sortedData = allData.sort((a, b) => b.character_level - a.character_level);

  return (
    <ul className={classes.container}>
      {guildMasterLoading && (
        <li>
          <Loading />
        </li>
      )}
      {!guildMasterLoading && guildmaterData && (
        <li>
          <div className={classes.masterCharHeader}>
            <FaCrown color="#ffe600" size={18} />
          </div>
          <div className={classes.charImage}>
            <Image
              src={guildmaterData.character_image}
              alt="guildMaster"
              width={100}
              height={100}
              priority
            />
          </div>
          <div className={classes.charInfo}>
            <span>{guildmaterData.character_name}</span>
            <span>lv.{guildmaterData.character_level}</span>
            <span>{guildmaterData.character_class}</span>
          </div>
        </li>
      )}

      {sortedData &&
        sortedData.map((e: Char) => {
          return (
            <li key={e!.character_name}>
              <div className={classes.charImage}>
                <Image src={e!.character_image} alt="guildMaster" width={96} height={96} priority />
              </div>
              <div className={classes.charInfo}>
                <span>{e!.character_name}</span>
                <span>lv.{e!.character_level}</span>
                <span>{e!.character_class}</span>
              </div>
            </li>
          );
        })}
      {isLoading && (
        <div className={classes.loadingText}>
          <p>캐릭터 로딩중입니다</p>
        </div>
      )}
    </ul>
  );
}
