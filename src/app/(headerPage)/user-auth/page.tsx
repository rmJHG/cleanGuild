"use client";

import { useEffect, useState } from "react";

import Setting from "./_component/Setting";
import { Char } from "@/types/char";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import classes from "./page.module.css";
import Loading from "../../_components/layout/Loading";
import Image from "next/image";
import goodImg from "../../../../public/img/goodImg.png";
import { errorModal } from "@/app/_lib/errorModal";

export default function Page() {
  const { data: session } = useSession();
  session?.user.handsData && redirect("/");

  const [img, setImg] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const fn = async () => {
    setIsLoading(true);
    if (!img) return;
    try {
      const formData = new FormData();
      formData.append("image", img);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/handsData/image/findMainCharacter`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.result.length > 0) {
        setMainChar(json.result[0]);
        setIsLoading(false);
        setIsOpen(true);
        console.log(json);
      } else {
        setIsLoading(false);
        errorModal(`${json.error} : ${json.message}`);
        throw json.error;
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const renderFileInput = () => {
    return (
      <div className={classes.fileContainer}>
        <label htmlFor="file">찾기</label>
        <input placeholder="첨부파일" value={img !== null ? img.name : ""} readOnly />
        <input type="file" name="file" id="file" accept="image/*" onChange={changeHandler} rel="prefetch" />
        {img && (
          <div>
            <button onClick={fn}>
              <p>SEARCH</p>
            </button>
          </div>
        )}
      </div>
    );
  };
  const renderExampleImage = () => {
    return (
      <div className={classes.infoContainer}>
        <p>올바른 이미지 예시</p>
        <Image
          src={goodImg}
          alt="ExampleImage"
          width={1000}
          height={1000}
          draggable={false}
          style={{
            width: "100%",
            height: "auto",
            WebkitTouchCallout: "none", // iOS에서 길게 누르기 메뉴 방지
            WebkitUserSelect: "none", // 텍스트 선택 방지
            KhtmlUserSelect: "none", // 옛날 브라우저 지원
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
          }}
          onContextMenu={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        />
      </div>
    );
  };
  return (
    <div className={classes.container}>
      <div>
        <h1>핸즈 인증</h1>
      </div>
      <div className={classes.intro}>
        <p>* 타인의 핸즈이미지를 사용하거나 *</p>
        <p>* 올바르지 않은 이미지를 사용할 경우 *</p>
        <p>* 문제가 발생할 수 있음 *</p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isOpen ? <Setting data={mainChar} img={img as File} /> : renderFileInput()}

          {!isOpen && (
            <>
              {img ? (
                <div className={classes.infoContainer}>
                  <p>사용자 이미지</p>
                  <Image
                    src={URL.createObjectURL(img)}
                    alt="userInputImage"
                    width={1000}
                    height={1000}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ) : (
                renderExampleImage()
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
