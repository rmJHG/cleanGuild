"use client";

import Loading from "@/app/_components/layout/Loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import getCharData from "../_lib/getCharData";
import classes from "./guildUserImage.module.css";

type Props = {
  guild_member_name: string;
  transformScaleX: string;
};
export default function GuildUserImage({ guild_member_name, transformScaleX }: Props) {
  const { data } = useQuery({
    queryKey: ["characterData", guild_member_name],
    queryFn: getCharData,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
  if (data) {
    return (
      <div className={classes.wrapper}>
        <Image
          src={data.character_image}
          alt="guildMasterImage"
          width={80}
          height={80}
          style={{ transform: `scaleX(${transformScaleX})` }}
        />
      </div>
    );
  } else {
    return <Loading />;
  }
}
