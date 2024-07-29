"use client";

import { useQuery } from "@tanstack/react-query";
import getGuildRank from "../../_lib/getGuildRank";
import Loading from "../layout/Loading";
import classes from "./GuildRankingTable.module.css";
import { GuildRanking } from "@/types/guildRanking";
type Props = {
  ranking_type: string;
  world_name: string;
};

export default function GuildRankTable({ ranking_type, world_name }: Props) {
  const { data } = useQuery<GuildRanking, Error, GuildRanking>({
    queryKey: ["guildRank", ranking_type, world_name, ""],
    queryFn: getGuildRank,
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <div className={classes.tableContainer}>
          <table className={classes.rankingTable}>
            <thead>
              <tr>
                <th scope="col">순위</th>
                <th scope="col">길드명</th>
                <th scope="col">점수</th>
              </tr>
            </thead>
            <tbody>
              {data.ranking.map((e) => {
                return (
                  <tr className={classes.guild} key={e.ranking + e.guild_name}>
                    <td>{e.ranking}</td>
                    <td>{e.guild_name}</td>
                    <td>{e.guild_point}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
