"use client";
import { useState } from "react";
import GuildRankTable from "./GuildRankTable";
import { serverList } from "../../serverList";
import Image from "next/image";
import classes from "./styles/GuildRank.module.css";
export default function GuildRank() {
  const [rankingType, setRankingType] = useState("0");
  const [worldName, setWorldName] = useState("루나");

  const rankingTypeList = ["주간 명성치", "플래그 레이스", "지하 수로"];
  return (
    <div className={classes.container}>
      <div className={classes.serverListContainer}>
        <div>
          <p>월드목록</p>
        </div>
        <ul>
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
                <Image src={img} alt={world_name + "main"} />
                <span className={classes.worldName} style={{ color: rankingType === String(i) ? "#333333" : "white" }}>
                  {world_name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classes.rankingTypeContainter}>
        <div>
          <p>랭킹 종류</p>
        </div>
        <ul>
          {rankingTypeList.map((e, i) => {
            return (
              <li
                key={e + i}
                onClick={() => {
                  setRankingType(`${i}`);
                }}
                style={{ backgroundColor: rankingType === String(i) ? "#ffffff7f" : "transparent" }}
              >
                <span style={{ color: rankingType === String(i) ? "#333333" : "white" }}>{e}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <GuildRankTable ranking_type={rankingType} world_name={worldName} />
    </div>
  );
}
