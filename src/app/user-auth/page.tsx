"use client";

import { FormEvent, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import Setting from "./_component/Setting";
import { Char } from "@/type/char";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import classes from "./page.module.css";
import Loading from "../_component/Loading";
import Image from "next/image";

import goodImg from "../../../public/img/goodImg.png";
export default function Page() {
  // 유저가 없거나 유저데이터에 핸즈데이터가 있을 경우 메인화면으로 보내기
  const { data: session } = useSession();
  !session && redirect("/");
  session?.user.handsData && redirect("/");

  const [img, setImg] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mainChar, setMainChar] = useState<Char | null>(null);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImg(file);
  };

  useEffect(() => {
    if (mainChar) {
      setIsOpen(true);
      setIsLoading(false);
    }
  }, [mainChar]);
  const fn = async (e: FormEvent) => {
    e.preventDefault();
    if (!img) return null;

    setIsLoading(true);

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
    //현재시간
    const dt = new Date();
    const currentDt = dt.toLocaleDateString("en-CA");
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
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array.slice(0, Math.min(array.length, 5));
    };
    const randomArr: string[] = getRandomElements(filteredArray);
    const randomResult: any[] = [];

    //임의로 5개의 닉네임을 추출해 메인캐릭터 이름들을 검색
    for (const value of randomArr) {
      try {
        const response = await fetch(
          `/api/nexon/data?character_name=${value}&dataType=mainCharInfo&currentDt=${currentDt}`,
          {
            method: "GET",
          }
        );
        const mainCharInfo = await response.json();

        if (mainCharInfo) {
          mainCharInfo.ranking?.length > 0 && randomResult.push(mainCharInfo?.ranking[0].character_name);
        }
      } catch (e) {
        console.log("랜덤캐릭터 에러", e);
      }
    }
    //검색된 메인캐릭터 이름들 사이에서 중복되는 값 찾기
    const result = randomResult.filter((e, i) => {
      return randomResult.indexOf(e) !== i;
    });
    // 중복된 닉네임으로 검색
    if (result.length > 0) {
      try {
        const response = await fetch(
          `/api/nexon/data?character_name=${result[0]}&dataType=charData&currentDt=${currentDt}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setMainChar(data);
      } catch (e) {
        console.error("메인캐릭터 데이터 에러", e);
      }
    }
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isOpen ? (
            <Setting data={mainChar} />
          ) : (
            <div className={classes.fileContainer}>
              <label htmlFor="file">찾기</label>
              <input placeholder="첨부파일" value={img !== null ? img.name : ""} readOnly />
              <input type="file" name="file" id="file" accept="image/*" onChange={changeHandler} rel="prefetch" />
              <div>
                <button onClick={fn}>
                  <p>SEARCH</p>
                </button>
              </div>
            </div>
          )}
          <div className={classes.intro}>
            <p>세부적인 컨텐츠를 이용하기 위해 핸즈 인증이 필요합니다.</p>
            <p>핸증 인증에 사용되는 핸즈 이미지는 저장되지않으며</p>
            <p> 메인 캐릭터의 추출만을 위해서 사용됩니다.</p>
          </div>

          <div className={classes.intro}>
            <p>* 본인의 것이 아닌 핸즈이미지를 사용하거나 *</p>
            <p>* 올바르지 않은 이미지를 사용할 경우 *</p>
            <p>* 문제가 발생할 수 있음 *</p>
          </div>

          <div className={classes.imgContainer}>
            <div>
              <p>올바른 이미지 예시</p>
              <p>(스마트폰 ui는 상관없음)</p>
            </div>

            <Image
              src={goodImg}
              alt="good"
              width={200}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
