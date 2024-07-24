"use client";

import Guild from "../_component/Guild";
import ServerList from "../_component/ServerList";
import classes from "./page.module.css";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPostData } from "./_lib/getPostData";
import { GuildPostData } from "@/type/guildPostData";
import Loading from "@/app/_component/Loading";
type Props = {
  params: {
    server: string;
  };
};
export default function DataTable({ params }: Props) {
  const decodedServer = decodeURIComponent(params.server);

  const { data, isLoading } = useQuery<GuildPostData[], Error, GuildPostData[], [string, string]>({
    queryKey: ["guildPost", decodedServer],
    queryFn: getPostData,
    staleTime: 0,
    gcTime: 1 * 60 * 1000,
  });

  return (
    <div className={classes.container}>
      <div className={classes.serverListWrapper}>
        <ServerList />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <ul className={classes.guildPostList}>
          {data!
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
