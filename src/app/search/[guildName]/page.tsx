"use client";

import getGuildRank from "@/app/_lib/getGuildRank";
import { useQuery } from "@tanstack/react-query";

type Props = {
  params: {
    guildName: string;
  };
};

export default function Page({ params }: Props) {
  const { guildName } = params;
  const decodedParams = decodeURI(guildName);

  const { data } = useQuery({
    queryKey: ["guildsData", 0, 0, decodedParams],
    queryFn: getGuildRank,
  });
  console.log(data);
  return <div></div>;
}
