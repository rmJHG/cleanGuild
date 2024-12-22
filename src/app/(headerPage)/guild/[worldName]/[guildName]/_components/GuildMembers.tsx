import { useQuery } from '@tanstack/react-query';
import classes from './guildMember.module.css';

import { Char } from '@/types/char';
import Image from 'next/image';
import getCharData from '@/app/_lib/getCharData';
type Props = {
  memberArr: string[];
  master: string;
};
export default function GuildMembers({ memberArr, master }: Props) {
  const { data: masterData } = useQuery<Char, Error, Char>({
    queryKey: ['char', master],
    queryFn: getCharData,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  console.log(masterData);
  return (
    <ul className={classes.container}>
      {masterData && (
        <li>
          <div>
            <Image
              src={masterData.character_image}
              alt="guildMaster"
              width={100}
              height={100}
              priority
            />
          </div>
          <div>
            <div>
              <span>{masterData.character_name}</span>
              <span>lv.{masterData.character_level}</span>
            </div>
            <div>
              <span>{masterData.character_class}</span>
            </div>
          </div>
        </li>
      )}
      {memberArr.map((e) => {
        return (
          <li key={e}>
            <div>추가 예정</div>
            <div>
              <span>{e}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
