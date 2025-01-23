import { useQuery } from '@tanstack/react-query';
import classes from './guildMember.module.css';

import { Char } from '@/types/char';
import Image from 'next/image';
import getCharData from '@/app/_hook/getCharData';
import Loading from '@/app/_components/layout/Loading';

import { FaCrown } from 'react-icons/fa';

type Props = {
  memberArr: string[];
  master: string;
};
export default function GuildMembers({ memberArr, master }: Props) {
  const { data: guildMaster, isLoading: guildLoading } = useQuery<Char[], Error, Char[]>({
    queryKey: ['char', [master]],
    queryFn: getCharData,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  const { data: guildMembers, isLoading: memberLoading } = useQuery<Char[], Error, Char[]>({
    queryKey: ['char', memberArr],
    queryFn: getCharData,
  });
  if (guildLoading || memberLoading)
    return (
      <div
        style={{
          width: '100%',

          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loading />
      </div>
    );
  const masterData = guildMaster![0];

  console.log('guildMembers', guildMembers);

  return (
    <ul className={classes.container}>
      {masterData && (
        <li>
          <div className={classes.masterCharHeader}>
            <FaCrown color="#ffe600" size={18} />
          </div>
          <div className={classes.charImage}>
            <Image
              src={masterData.character_image}
              alt="guildMaster"
              width={100}
              height={100}
              priority
            />
          </div>
          <div className={classes.charInfo}>
            <span>{masterData.character_name}</span>
            <span>lv.{masterData.character_level}</span>
            <span>{masterData.character_class}</span>
          </div>
        </li>
      )}

      {guildMembers &&
        guildMembers.map((e: Char) => {
          return (
            <li key={e!.character_name}>
              <div className={classes.charImage}>
                <Image src={e!.character_image} alt="guildMaster" width={96} height={96} />
              </div>
              <div className={classes.charInfo}>
                <span>{e!.character_name}</span>
                <span>lv.{e!.character_level}</span>
                <span>{e!.character_class}</span>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
