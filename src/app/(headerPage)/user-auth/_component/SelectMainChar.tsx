import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classes from './_styles/selectChar.module.css';
import { Char } from '@/types/char';
import Image from 'next/image';
import { ServerName, totalServerList } from '@/app/serverList';
import { errorModal } from '@/app/_lib/errorModal';

type Props = {
  resetState: () => void;
  findResult: Char[] | null;
  setMainChar: Dispatch<SetStateAction<Char | null>>;
  onNext: () => void;
  onPrev: () => void;
};
export default function SelectMainChar({
  resetState,
  findResult,
  setMainChar,
  onNext,
  onPrev,
}: Props) {
  const [selectedChar, setSelectedChar] = useState<Char | null>(null);
  const getServerImage = (worldName: ServerName) => {
    return totalServerList[worldName];
  };

  const handlePrev = () => {
    resetState;
    onPrev();
  };
  const handleNext = () => {
    if (!selectedChar) {
      errorModal('메인 캐릭터를 선택해주세요.');
      return;
    }
    setMainChar(selectedChar);
    onNext();
  };
  useEffect(() => {
    if (!findResult) {
      onPrev();
    }
    if (findResult && findResult.length === 1) {
      setMainChar(findResult[0]);
      onNext();
    }
  }, [findResult]);

  return (
    <div className={classes.container}>
      <div className={classes.charContainer}>
        {findResult && findResult.length >= 2 && (
          <div className={classes.selectCharCotainer}>
            {findResult.map((char, idx) => {
              return (
                <div
                  className={classes.charInfoContainer}
                  style={{
                    backgroundColor: selectedChar === char ? '#525fe4' : 'rgba(82, 95, 228, 0.8)',
                  }}
                  key={idx}
                  onClick={() => setSelectedChar(char)}
                >
                  <div className={classes.charInfo}>
                    <Image src={char!.character_image} alt="mainChar" width={110} height={110} />
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
                  </div>
                  <p className={classes.selectMsg}> {selectedChar === char ? '선택됨' : ' '}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={classes.btnContainer}>
        <button onClick={handleNext}>다음으로</button>
        <button onClick={handlePrev}>다시찾기</button>
      </div>
    </div>
  );
}
