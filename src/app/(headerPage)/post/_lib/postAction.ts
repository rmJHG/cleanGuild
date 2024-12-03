"use server";

import { auth } from "@/auth";
import { HandsData } from "@/types/userData";

export const postAction = async (previousState: any, formData: FormData) => {
  const dt = new Date();
  const session = await auth();
  if (!session) {
    return "인증 정보가 없습니다.";
  }
  const { user } = session;
  const { character_guild_name } = user.handsData as HandsData;
  console.log("formData", formData);
  const guildPostData = {
    postData: {
      title: formData.get("title"),
      description: formData.get("description"),
      guildName: character_guild_name,
      guildType: formData.get("guildType"),
      currentNoblePoint: Number(formData.get("currentNoblePoint")),
      suroPoint: Number(formData.get("suroPoint")),
      limitedLevel: Number(formData.get("limitedLevel")),
      postDate: dt.getTime(),
      childGuild: formData.get("childGuild") === "무",
      managerNameArr: JSON.parse(formData.get("managerNameArr") as string),
      openKakaotalkLink: formData.get("openKakaotalkLink"),
      guildLevel: Number(formData.get("guild_level")),
      guildMemberCount: Number(formData.get("guild_member_count")),
    },
    publisherData: { ...user },
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/${user.loginType}/postGuildRecruitments`,
      {
        method: "POST",
        body: JSON.stringify(guildPostData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    const data = await res.json();
    console.log("data", data);
    if (res.ok) {
      return "성공";
    } else {
      return `실패_${Date.now()}`;
    }
  } catch (error) {
    return `실패_${Date.now()}`;
  }
};
