"use client";

import { FormEvent, useState } from "react";
import { createWorker } from "tesseract.js";
import Setting from "./_component/Setting";
import { Char } from "@/type/char";

export default function Page() {
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
    let currentMonth: string = dt.getMonth() + 1 < 10 ? `0` + (dt.getMonth() + 1) : "" + dt.getMonth() + 1;
    const currentDt = dt.getFullYear() + "-" + currentMonth + "-" + dt.getDate();

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

    //임의의 숫자
    const randomNumber = Math.floor((Math.random() * filteredArray.length) / 3);
    const randomResult = [];
    for (let i = randomNumber; i < randomNumber + 4; i++) {
      const randomChar = filteredArray[i];
      //해당 핸즈의 메인캐릭터 추출
      const fetchedOcidData = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${randomChar}`, {
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
        randomResult.push(mainCharJson);
      }
    }
    const filteredResult: string[] = randomResult
      .filter((e) => {
        return e.ranking.length >= 1;
      })
      .map((e) => {
        return e.ranking[0].character_name;
      });
    const result = filteredResult.filter((e) => {
      return filteredResult.indexOf(e) !== filteredResult.lastIndexOf(e);
    });

    if (result.length > 0) {
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
      <form>
        <input type="file" name="file" id="file" accept="image/*" onChange={changeHandler} required />
        <button onClick={fn}>SEARCH</button>
      </form>
      <div>{isOpen && <Setting data={mainChar} />}</div>
    </div>
  );
}
