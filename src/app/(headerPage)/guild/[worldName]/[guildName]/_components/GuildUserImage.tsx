"use client";

import Loading from "@/app/_components/layout/Loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import classes from "./guildUserImage.module.css";
import { Char } from "@/types/char";
import getCharData from "@/app/_lib/getCharData";

type Props = {
  guild_member_name: string;
  transformScaleX: string;
};
export default function GuildUserImage({ guild_member_name, transformScaleX }: Props) {
  const { data: charData } = useQuery<Char, Error, Char, [_1: string, userName: string]>({
    queryKey: ["char", guild_member_name],
    queryFn: getCharData,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });

  if (charData) {
    return (
      <div className={classes.wrapper}>
        <Image
          src={charData.character_image}
          alt="guildMasterImage"
          width={80}
          height={80}
          style={{ transform: `scaleX(${transformScaleX})` }}
          priority
        />
      </div>
    );
  } else {
    return <Loading />;
  }
}
