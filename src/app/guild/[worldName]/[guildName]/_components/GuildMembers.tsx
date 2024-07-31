import { useQuery } from "@tanstack/react-query";
import classes from "./guildMember.module.css";
import getCharData from "../_lib/getCharData";
import { Char } from "@/types/char";
import Image from "next/image";
type Props = {
  memberArr: string[];
  master: string;
};
export default function GuildMembers({ memberArr, master }: Props) {
  const { data: masterData } = useQuery<Char, Error, Char>({
    queryKey: ["characterData", master],
    queryFn: getCharData,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  console.log(masterData);
  return (
    <div className={classes.container}>
      {masterData && (
        <div>
          <div>
            <Image src={masterData.character_image} alt="guildMaster" width={100} height={100} />
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
        </div>
      )}
      {memberArr.map((e) => {
        return (
          <div key={e}>
            <div>추가 예정</div>
            <div>
              <span>{e}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
