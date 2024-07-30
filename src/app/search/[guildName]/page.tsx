"use client";

import Loading from "@/app/_components/layout/Loading";
import getGuildRank from "@/app/_lib/getGuildRank";
import { GuildRanking } from "@/types/guildRanking";
import { useQuery } from "@tanstack/react-query";
import classes from "./page.module.css";
import SearchedGuild from "../_components/SearchedGuild";
type Props = {
  params: {
    guildName: string;
  };
};

export default function Page({ params }: Props) {
  const { guildName } = params;
  const decodedParams = decodeURI(guildName);

  const { data } = useQuery<GuildRanking, Error, GuildRanking>({
    queryKey: ["guildsData", 0, 0, decodedParams],
    queryFn: getGuildRank,
  });

  return data ? (
    <div className={classes.container}>
      {data.ranking.map((e, i) => {
        return <SearchedGuild key={e.guild_name + e.world_name} data={e} />;
      })}
    </div>
  ) : (
    <Loading />
  );
}
