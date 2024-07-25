"use client";

import Guild from "../_component/Guild";
import ServerList from "../_component/ServerList";
import classes from "./page.module.css";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPostData } from "./_lib/getPostData";
import { GuildPostData } from "@/type/guildPostData";
import Loading from "@/app/_component/Loading";

import { useState } from "react";
import Select from "@/app/_component/Select";
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

      return isGuildTypeMatch && isChildGuildMatch && isNoblePointMatch;
    });

  return (
    <div className={classes.container}>
      <div className={classes.serverListWrapper}>
        <ServerList />
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
      </div>
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
  );
}
