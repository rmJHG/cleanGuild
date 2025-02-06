'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import classes from './_styles/guildUserImage.module.css';
import { Char } from '@/types/char';
import getCharData from '@/app/_hook/getCharData';
import NormalLoading from '@/app/_components/layout/normalLoading';

type Props = {
  guild_member_name: string;
  transformScaleX: string;
};
export default function GuildUserImage({ guild_member_name, transformScaleX }: Props) {
  const { data: charData, isLoading } = useQuery<
    Char[],
    Error,
    Char[],
    [_1: string, userName: string[]]
  >({
    queryKey: ['char', [guild_member_name]],
    queryFn: getCharData,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });

  if (isLoading) return <NormalLoading color="black" />;

  if (!isLoading && !charData) return null;

  if (charData && charData[0]) {
    console.log(charData, 'charData');
    return (
      <div className={classes.wrapper}>
        <Image
          src={charData[0].character_image}
          alt="guildMasterImage"
          width={70}
          height={70}
          style={{ transform: `scaleX(${transformScaleX})` }}
          priority
        />
      </div>
    );
  }
}
