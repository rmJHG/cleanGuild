"use client";

import { useQueries } from "@tanstack/react-query";
import { getGuildData } from "../../_lib/getGuildData";
import PostForm from "./_component/PostForm";
import { useSession } from "next-auth/react";
import getCooltime from "./_lib/getCooltime";
import Loading from "@/app/_components/layout/Loading";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) redirect("/signin");
  const { handsData } = session.user;

  if (!handsData?.character_guild_name) {
    return (
      <div style={{ minHeight: "100%", display: "flex", alignItems: "center" }}>
        <p>길드가 없으신 것 같네요! 구해보는건 어떨까요?</p>
        <Link href="/find">길드 구해보기</Link>
      </div>
    );
  }

  const result = useQueries({
    queries: [
      {
        queryKey: ["guildData", handsData!.world_name, handsData!.character_guild_name],
        queryFn: getGuildData,
        staleTime: 60 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        enabled: !!session?.user.handsData!.character_guild_name,
      },
      {
        queryKey: ["cooltime", handsData!.world_name, handsData!.character_guild_name],
        queryFn: getCooltime,
        gcTime: 0,
      },
    ],
  });

  const data2 = result[0].data as GuildData;
  const postCooltime = result[1].data;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", flex: "1" }}>
      <PostForm guildData={{ ...data2, currentNoblePoint: 45, postCooltime: postCooltime }} />
    </div>
  );
  if (data2?.error) return <div>error {data2.error.message}</div>;

  if (data2 === undefined || (postCooltime && undefined)) return <Loading />;
  const currentNoblePoint: number = data2!.guild_noblesse_skill.reduce((a, b) => {
    return a + b.skill_level;
  }, 0);

  if (data2.guild_master_name === handsData.character_name) {
    return <PostForm guildData={{ ...data2, currentNoblePoint, postCooltime: postCooltime }} />;
  } else {
    return (
      <div style={{ minHeight: "100%", display: "flex", alignContent: "center", justifyContent: "center", flex: "1" }}>
        <p>길드마스터만 홍보 가능합니다!</p>
      </div>
    );
  }
}
