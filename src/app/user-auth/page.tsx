"use client";

import { FormEvent, useState } from "react";
import { createWorker } from "tesseract.js";
import Setting from "./_component/Setting";
import { Char } from "@/type/char";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useUserData } from "@/zustand/userDataState";

export default function Page() {
  // 유저가 없거나 유저데이터에 핸즈데이터가 있을 경우 메인화면으로 보내기
  const session = useSession();
  !session.data && redirect("/");
  const { userData } = useUserData();
  userData.info.handsData && redirect("/");

  const [img, setImg] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mainChar, setMainChar] = useState<Char>(null);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImg(file);
  };

  const fn = async (e: FormEvent) => {
    e.preventDefault();
    //현재날짜 구하기
    const dt = new Date();
    const currentMonth: string = dt.getMonth() + 1 < 10 ? `0` + (dt.getMonth() + 1) : "" + dt.getMonth() + 1;
    const currentDay = dt.getDay() < 10 ? "0" + dt.getDay() : "" + dt.getDay();
    const currentDt = dt.getFullYear() + "-" + currentMonth + "-" + currentDay;

    //이미지 파일의 텍스트 추출 라이브러리
    const worker = await createWorker(["kor", "eng"]);
    const ret = await worker.recognize(img as File);
    const data = ret.data.text.split("\n");

    const filteredArray: string[] = [];

    //정규표현식(num, kor, eng, spec)
    const numberPattern = /\d{4,}/g;
    const koreanPattern = /[가-힣]{2,}/g;
    const englishPattern = /[a-zA-Z]{4,}/g;
    const specialCharPattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

    //불필요한 텍스트 제거
    data.forEach((item) => {
      const words = item.split(" ");
      const filteredWords = words.filter((word) => {
        if (!specialCharPattern.test(word)) {
          return numberPattern.test(word) || koreanPattern.test(word) || englishPattern.test(word);
        }
      });
      filteredWords.forEach((e) => {
        e.length >= 1 && filteredArray.push(e);
      });
    });

    const getRandomElements = (array: string[]) => {
      // Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      // Return the first n elements from the shuffled array
      return array.slice(0, Math.min(array.length, 5));
    };
    const randomArr: string[] = getRandomElements(filteredArray);

    const randomResult: any[] = [];
    //임의로 5개의 닉네임을 추출해 메인캐릭터 이름들을 검색
    for (const value of randomArr) {
      const fetchedOcidData = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${value}`, {
        method: "GET",
        headers: {
          "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
        },
      });
      const ocidJson = await fetchedOcidData.json();

      if (ocidJson.ocid) {
        const getMainCharData = await fetch(
          `https://open.api.nexon.com/maplestory/v1/ranking/union?ocid=${ocidJson.ocid}&date=${currentDt}&page=1`,
          {
            method: "GET",
            headers: {
              "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
            },
          }
        );
        const mainCharJson = await getMainCharData.json();
        mainCharJson.ranking.length > 0 && randomResult.push(mainCharJson.ranking[0].character_name);
      }
    }
    //검색된 메인캐릭터 이름들 사이에서 중복되는 값 찾기
    const result = randomResult.filter((e, i) => {
      return randomResult.indexOf(e) !== i;
    });
    // 중복된 닉네임으로 검색
    if (result.length > 0) {
      console.log(result);
      const getOcidData = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${result[0]}`, {
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
      setMainChar(charRes);
    }

    setIsOpen(true);
  };

  return (
    <div>
      <div>
        {isOpen ? (
          <Setting data={mainChar} />
        ) : (
          <form>
            <input type="file" name="file" id="file" accept="image/*" onChange={changeHandler} required />
            <button onClick={fn}>SEARCH</button>
          </form>
        )}
      </div>
    </div>
  );
}
