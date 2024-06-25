"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Char } from "@/type/char";
import { getSearchResult } from "../_lib/getSearchResult";
type Props = {
  userName: string;
};
export default function CharInfo({ userName }: Props) {
  const { data, error } = useQuery<Char, Error, Char, [_1: string, _2: string, userName: string]>({
    queryKey: ["search", "char", userName],
    queryFn: getSearchResult,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });

  console.log(data, error);
  if (data === undefined) return <div>hello</div>;
  if (data?.error) return <div>error</div>;
  if (data)
    return (
      <div>
        <div>
          <p> {data!.character_name}</p> <p>{data!.character_gender}캐</p>
        </div>
        <div>
          <Image src={data!.character_image} alt="" width={100} height={100} />
        </div>
      </div>
    );
}
