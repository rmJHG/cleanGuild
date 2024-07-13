"use client";

import { useUserData } from "@/zustand/userDataState";
import { useQuery } from "@tanstack/react-query";
import { getGuildData } from "./_lib/getGuildData";
import PostForm from "./_component/PostForm";
export default function Page() {
  const { userData } = useUserData();
  const { handsData } = userData.info;

  const { data, isLoading } = useQuery<GuildData>({
    queryKey: ["guildData", handsData.world_name, handsData.character_guild_name],
    queryFn: getGuildData,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled: handsData.character_guild_name !== undefined,
  });

  if (data) {
    const currentNoblePoint: number = data!.guild_noblesse_skill.reduce((a, b) => {
      return a + b.skill_level;
    }, 0);
    return (
      <div>
        <PostForm guildData={{ ...data, currentNoblePoint }} />
      </div>
    );
  }
}
