"use client";
import { useState } from "react";
import GuildRankTable from "./GuildRankTable";
import { serverList } from "../../serverList";
import Image from "next/image";
import classes from "./GuildRank.module.css";
export default function GuildRank() {
  const [rankingType, setRankingType] = useState("0");
  const [worldName, setWorldName] = useState("루나");

  const rankingTypeList = ["주간 명성치", "플래그 레이스", "지하 수로"];
  return (
    <div className={classes.container}>
      <ul className={classes.serverListContainer}>
        {serverList.map((e, i) => {
          const img = e[0];
          const world_name = e[1] as string;
          return (
            <li
              key={world_name + i}
              onClick={() => {
                setWorldName(world_name);
              }}
              style={{ backgroundColor: worldName === world_name ? "#ffffff7f" : "transparent" }}
            >
              <Image src={img} alt={world_name} />
              <span>{world_name}</span>
            </li>
          );
        })}
      </ul>

      <ul className={classes.rankingTypeContainter}>
        {rankingTypeList.map((e, i) => {
          return (
            <li
              key={e + i}
              onClick={() => {
                setRankingType(`${i}`);
              }}
              style={{ backgroundColor: rankingType === String(i) ? "#ffffff7f" : "transparent" }}
            >
              <span>{e}</span>
            </li>
          );
        })}
      </ul>

      <GuildRankTable ranking_type={rankingType} world_name={worldName} />
    </div>
  );
}
