import { Char } from '@/types/char';

import Image from 'next/image';
import classes from './_styles/saveImage.module.css';
import { serverListTest, ServerName } from '@/app/serverList';
import customFetch from '@/app/_lib/customFetch';
import { successModal } from '@/app/_lib/successModal';
import Logout from '@/app/_components/Logout';
import { errorModal } from '@/app/_lib/errorModal';
import { useSession } from 'next-auth/react';

export default function SaveImage({
  onPrev,
  mainChar,
  setMainChar,
  img,
  setImg,
  selectedChar,
  setSelectedChar,
}: {
  mainChar: Char[] | null;
  setMainChar: React.Dispatch<React.SetStateAction<Char[] | null>>;
  img: File | null;
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
  onPrev: () => void;

  selectedChar: Char | null;
  setSelectedChar: React.Dispatch<React.SetStateAction<Char | null>>;
}) {
  const { data: session, update, status } = useSession();
  if (!session) return null;
  const { user } = session;
  const handleSelectChar = (char: Char) => {
    selectedChar === char ? setSelectedChar(null) : setSelectedChar(char);
  };
  const reSearch = () => {
    console.log(mainChar);
    console.log(img);
    setMainChar(null);
    setImg(null);
    onPrev();
  };

  const getServerImage = (worldName: ServerName) => {
    return serverListTest[worldName]; // 기본 이미지 처리
  };
  const normalSave = async () => {
    const formData = new FormData();
    formData.append('image', img as File);
    formData.append('ocid', mainChar![0]!.ocid);
    try {
      const res = await customFetch({
        url: `/api/v1/user/${user.loginType}/saveHandsImage`,
        method: 'POST',
        loginType: user.loginType,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: formData,
        token: user.accessToken,
        update,
      });
      console.log(res);
      if (
        res.result.status === 200 &&
        res.result.message === '핸즈 이미지 업로드가 완료되었습니다.'
      ) {
        successModal('저장됐습니다 다시 로그인해주세요.', 2000);
        Logout();
      } else {
        errorModal(res.result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectedSave = async () => {
    console.log(img);
    const formData = new FormData();
    formData.append('image', img as File);
    formData.append('ocid', selectedChar?.ocid as string);
    try {
      const res = await customFetch({
        url: `/api/v1/user/${user.loginType}/saveHandsImage`,
        method: 'POST',
        loginType: user.loginType,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: formData,
        token: user.accessToken,
        update,
      });
      console.log(res);
      if (
        res.result.status === 200 &&
        res.result.message === '핸즈 이미지 업로드가 완료되었습니다.'
      ) {
        successModal('저장됐습니다 다시 로그인해주세요.', 2000);
        Logout();
      } else {
        errorModal(res.result.message);
      }

      errorModal(res.result.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.container}>
      {mainChar && mainChar.length < 2 && (
        <>
          <div className={classes.charInfoContainer}>
            <div className={classes.charInfo}>
              <p>조회 결과</p>
              <Image src={mainChar[0]!.character_image} alt="mainChar" width={150} height={150} />
              <div className={classes.charInfoText}>
                <h3>
                  {
                    <Image
                      src={getServerImage(mainChar[0]!.world_name as ServerName)}
                      alt="world_icon"
                      width={20}
                      height={20}
                    />
                  }
                  {mainChar[0]!.character_name}
                </h3>
                <p>
                  {mainChar[0]!.character_level}Lv ({mainChar[0]!.character_exp_rate}%)
                </p>
                <p>{mainChar[0]!.character_class}</p>
                <p>길드 : {mainChar[0]!.character_guild_name}</p>
              </div>
            </div>
          </div>
          <div className={classes.btnContainer}>
            <button onClick={normalSave}>저장하기</button>
            <button onClick={reSearch}>다시찾기</button>
          </div>
        </>
      )}
      {mainChar && mainChar.length >= 2 && (
        <>
          <div className={classes.selectCharCotainer}>
            <p>본인의 메인 캐릭터를 골라주세요.</p>
            <div className={classes.selectChar}>
              {mainChar.map((char, idx) => {
                return (
                  <div
                    className={classes.charInfo}
                    style={{ opacity: selectedChar === char ? 1 : 0.8 }}
                    key={idx}
                    onClick={() => handleSelectChar(char)}
                  >
                    <Image src={char!.character_image} alt="mainChar" width={150} height={150} />
                    <div className={classes.charInfoText}>
                      <h3>
                        <Image
                          src={getServerImage(char!.world_name as ServerName)}
                          alt="world_icon"
                          width={15}
                          height={15}
                        />

                        {char!.character_name}
                      </h3>
                      <p>
                        {char!.character_level}Lv ({char!.character_exp_rate}%)
                      </p>
                      <p>{char!.character_class}</p>
                      <p>길드 : {char!.character_guild_name}</p>
                    </div>
                    {selectedChar === char && <p className={classes.selectMsg}>선택됨</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
