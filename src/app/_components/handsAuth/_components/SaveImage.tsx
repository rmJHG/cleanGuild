import { Char } from '@/types/char';

import Image from 'next/image';
import classes from './_styles/saveImage.module.css';
import { ServerName, totalServerList } from '@/app/serverList';
import customFetch from '@/app/_lib/customFetch';
import { successModal } from '@/app/_lib/successModal';
import { errorModal } from '@/app/_lib/errorModal';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function SaveImage({
  onPrev,
  img,
  mainChar,
  selectedChar,
  accessToken,
}: {
  img: File | null;
  onPrev: () => void;
  mainChar: Char;
  selectedChar: Char | null;
  accessToken: string;
}) {
  const [isFetching, setIsFetching] = useState(false);

  const reSearch = () => {
    onPrev();
  };

  const getServerImage = (worldName: ServerName) => {
    return totalServerList[worldName]; // 기본 이미지 처리
  };
  const saveHandsImage = async () => {
    setIsFetching(true);
    console.log(mainChar, selectedChar);
    const formData = new FormData();
    formData.append('image', img as File);
    formData.append('mainCharOcid', mainChar!.ocid);
    formData.append('currentCharOcid', selectedChar!.ocid);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/saveHandsImage`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      if (data === '핸즈 이미지 업로드가 완료되었습니다.') {
        successModal('저장됐습니다 다시 로그인해주세요.', 2000);
        setTimeout(() => {
          signOut({ callbackUrl: '/logoutRedirect' });
        }, 2000);
      } else {
        errorModal(data.message);
        setIsFetching(false);
      }
    } catch (error: any) {
      console.error(error);
      errorModal(error.message);
      setIsFetching(false);
    }
  };

  return (
    <div className={classes.container}>
      {selectedChar && (
        <>
          <div className={classes.charInfoContainer}>
            <div className={classes.charInfo}>
              <Image src={selectedChar.character_image} alt="mainChar" width={150} height={150} />
              <div className={classes.charInfoText}>
                <h3>
                  {
                    <Image
                      src={getServerImage(selectedChar.world_name as ServerName)}
                      alt="world_icon"
                      width={20}
                      height={20}
                    />
                  }
                  {selectedChar.character_name}
                </h3>
                <p>
                  {selectedChar.character_level}Lv ({selectedChar.character_exp_rate}%)
                </p>
                <p>{selectedChar.character_class}</p>
                <p>길드 : {selectedChar.character_guild_name}</p>
              </div>
            </div>
          </div>
          <div className={classes.btnContainer}>
            <button onClick={saveHandsImage} disabled={isFetching}>
              저장하기
            </button>
            <button onClick={reSearch} disabled={isFetching}>
              다시찾기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
