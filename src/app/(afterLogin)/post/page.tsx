"use client";

import { useQuery } from "@tanstack/react-query";
import { getGuildData } from "./_lib/getGuildData";
import PostForm from "./_component/PostForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  if (!session) redirect("/");
  const { handsData } = session?.user;
  if (!handsData) redirect("/");
  const { data, isLoading } = useQuery<GuildData>({
    queryKey: ["guildData", handsData!.world_name, handsData!.character_guild_name],
    queryFn: getGuildData,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled: !!session?.user.handsData!.character_guild_name,
  });

  if (data?.error) {
    return <div>error {data.error.message}</div>;
  }
  if (data) {
    const currentNoblePoint: number = data!.guild_noblesse_skill.reduce((a, b) => {
      return a + b.skill_level;
    }, 0);

    return (
      <>
        <PostForm guildData={{ ...data, currentNoblePoint }} />
      </>
    );
  }
  return null;
}
