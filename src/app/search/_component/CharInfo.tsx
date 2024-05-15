"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { Char } from "@/type/char";
import { getSearchResult } from "../_lib/getSearchResult";
type Props = {
  userName: string;
};
export default function CharInfo({ userName }: Props) {
  const { data, isLoading, error } = useQuery<Char, Error, Char, [_1: string, _2: string, userName: string]>({
    queryKey: ["search", "user", userName],
    queryFn: getSearchResult,
  });

  if (data === null) {
    return <div>입력대기중</div>;
  }
  return !error ? (
    <div>
      <div>
        <p> {data!.character_name}</p> <p>{data!.character_gender}캐</p>
      </div>
      <div></div>
      <div>
        <Image src={data!.character_image} alt="" width={100} height={100} />
      </div>
    </div>
  ) : (
    <div>
      <p>올바르지 않은 사용자입니다.</p>
    </div>
  );
}
