"use client";

import Guild from "../_component/Guild";
import ServerList from "../_component/ServerList";
import classes from "./page.module.css";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPostData } from "./_lib/getPostData";
import { GuildPostData } from "@/types/guildPostData";
import Loading from "@/app/_components/layout/Loading";

import { useState } from "react";
import Select from "@/app/_components/Select";
type Props = {
  params: {
    server: string;
  };
};
export default function DataTable({ params }: Props) {
  const decodedServer = decodeURIComponent(params.server);
  const [guildType, setGuildType] = useState("");
  const [childGuild, setChildGuild] = useState("");
  const [noblePoint, setNoblePoint] = useState("");
  const [suroPoint, setSuroPoint] = useState("");
  const { data } = useQuery<GuildPostData[], Error, GuildPostData[], [string, string]>({
    queryKey: ["guildPost", decodedServer],
    queryFn: getPostData,
    staleTime: 0,
    gcTime: 1 * 60 * 1000,
  });

  const filteredData =
    data &&
    data.filter((e) => {
      const isGuildTypeMatch = !guildType || guildType === "전체" || e.postData.guildType === guildType;
      const isChildGuildMatch =
        !childGuild || childGuild === "전체" || (childGuild === "유" ? e.postData.childGuild : !e.postData.childGuild);
      const noblePointValue = e.postData.currentNoblePoint ? `${e.postData.currentNoblePoint}p` : "";
      const isNoblePointMatch = !noblePoint || noblePoint === "전체" || noblePoint === noblePointValue;

      const suroPointValue = e.postData.suroPoint;
      const isSuroPointMatch =
        !suroPoint ||
        suroPoint === "전체" ||
        (suroPoint === "1000 이하" && suroPointValue <= 1000) ||
        (suroPoint === "1000~3000" && suroPointValue > 1000 && suroPointValue <= 3000) ||
        (suroPoint === "3000~5000" && suroPointValue > 3000 && suroPointValue <= 5000) ||
        (suroPoint === "5000~10000" && suroPointValue > 5000 && suroPointValue <= 10000) ||
        (suroPoint === "10000 이상" && suroPointValue > 10000);

      return isGuildTypeMatch && isChildGuildMatch && isNoblePointMatch && isSuroPointMatch;
    });

  return (
    <div className={classes.container}>
      <div className={classes.serverListWrapper}>
        <ServerList clicked={decodedServer as string} />
      </div>

      <div className={classes.optionContainer}>
        <Select
          optionsArr={["전체", "친목", "자유", "유니온", "랭킹", "솔로"]}
          selectName="hello"
          setState={setGuildType}
          placeholder="길드타입"
        />

        <Select
          optionsArr={["전체", "유", "무"]}
          selectName="childGuild"
          setState={setChildGuild}
          placeholder="부캐길드유무"
        />
        <Select
          optionsArr={["전체", "30p", "45p", "50p", "60p"]}
          selectName="noblePoint"
          setState={setNoblePoint}
          placeholder="노블포인트"
        />
        <Select
          optionsArr={["전체", "1000 이하", "1000~3000", "3000~5000", "5000~10000", "10000 이상"]}
          selectName="suroPoint"
          setState={setSuroPoint}
          placeholder="수로점수"
        />
      </div>
      <div style={{ minHeight: "100%" }}>
        {!filteredData ? (
          <Loading />
        ) : (
          <ul className={classes.guildPostList}>
            {filteredData!
              .sort((a, b) => {
                return b.postData.postDate - a.postData.postDate;
              })
              .map((e) => {
                return (
                  <li key={e.postId}>
                    <Link href={`/find/${decodedServer}/${e.postId}`} prefetch={false}>
                      <Guild data={e} />
                    </Link>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}
