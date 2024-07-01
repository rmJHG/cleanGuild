"use client";

import { useQuery } from "@tanstack/react-query";
import { Char } from "@/type/char";
import { getSearchResult } from "../_lib/getSearchResult";
import CharComponent from "@/app/_component/CharComponent";
type Props = {
  userName: string;
};
export default function CharInfo({ userName }: Props) {
  const { data } = useQuery<Char, Error, Char, [_1: string, _2: string, userName: string]>({
    queryKey: ["search", "char", userName],
    queryFn: getSearchResult,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });
  if (data === undefined) return <div>hello</div>;
  if (data?.error) return <div>error</div>;
  if (!data) return null;

  if (data)
    return (
      <div>
        <CharComponent data={data} />
      </div>
    );
}
