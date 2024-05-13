"use client";

import useCharStore from "@/zustand/charData";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import CharInfo from "../_component/CharInfo";

export default function Page() {
  const [userName, setUserName] = useState("");
  const onChangeNameHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const saveCharData = useCharStore((state) => state.getData);

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();
    const getOcidData = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${userName}`, {
      method: "GET",
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });
    const ocidRes = await getOcidData.json();

    const getCharData = await fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocidRes.ocid}`, {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });
    const charRes = await getCharData.json();

    saveCharData(charRes);
  };
  return (
    <>
      <form>
        <input type="text" onChange={onChangeNameHandler} required />
        <button onClick={submit}>검색</button>
      </form>

      <CharInfo />
    </>
  );
}
