"use client";

import { useQuery } from "@tanstack/react-query";
import getGuildRank from "../../_lib/getGuildRank";
import Loading from "../layout/Loading";
import classes from "./styles/GuildRankingTable.module.css";
import { GuildRanking } from "@/types/guildRanking";
import { useState } from "react";
import Link from "next/link";
type Props = {
  ranking_type: string;
  world_name: string;
};

export default function GuildRankTable({ ranking_type, world_name }: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useQuery<GuildRanking, Error, GuildRanking>({
    queryKey: ["guildRank", ranking_type, world_name, ""],
    queryFn: getGuildRank,
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });
  const currentItems = data && data.ranking.slice(currentPage, currentPage + 20);

  console.log(data);
  return (
    <>
      <div className={classes.tableWrapper}>
        <table className={classes.rankingTable}>
          {data ? (
            <>
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
                      <td>{e.ranking}</td>
                      <td className={classes.guildNameCell}>
                        <Link href={`/guild/${world_name}/${e.guild_name}`}>{e.guild_name}</Link>
                      </td>
                      <td>{e.guild_point.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <div className={classes.btnContainer}>
        {currentPage > 1 ? (
          <button
            onClick={() => {
              setCurrentPage(currentPage - 20);
            }}
          >
            <span>이전</span>
          </button>
        ) : (
          <div></div>
        )}

        {currentPage < 180 && (
          <button
            onClick={() => {
              setCurrentPage(currentPage + 20);
            }}
          >
            <span>다음</span>
          </button>
        )}
      </div>
    </>
  );
}
