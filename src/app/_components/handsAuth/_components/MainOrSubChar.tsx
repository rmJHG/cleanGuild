import { ServerName, totalServerList } from '@/app/serverList';
import classes from './_styles/mainOrSubChar.module.css';
import { Char } from '@/types/char';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { errorModal } from '@/app/_lib/errorModal';

import { FaSearch } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

import SearchModal from './SearchModal';

type Props = {
  resetState: ({}) => void;
  findResult: Char[] | null;
  searchedChar: Char | null;
  setSearchedChar: Dispatch<SetStateAction<Char | null>>;
  mainChar: Char | null;
  setSelectedChar: Dispatch<SetStateAction<Char | null>>;
  onNext: () => void;
  onPrev: () => void;
};

export default function MainOrSubChar({
  resetState,
  findResult,
  searchedChar,
  setSearchedChar,
  mainChar,
  setSelectedChar,
  onNext,
  onPrev,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<Char | null>(null);
  const getServerImage = (worldName: ServerName) => {
    return totalServerList[worldName];
  };
  const handlePrev = () => {
    if (findResult!.length <= 1) {
      resetState({
        img: true,
        mainChar: true,
        selectedChar: true,
        findResult: true,
        searchedChar: true,
      });
      onPrev();
    } else {
      resetState({
        mainChar: true,
        selectedChar: true,
        searchedChar: true,
      });
      onPrev();
    }
  };
  const handleNext = () => {
    if (!selected) {
      errorModal('캐릭터를 선택해주세요.');
      return;
    }
    setSelectedChar(selected);
    onNext();
  };

  return (
    <div className={classes.container}>
      <div className={classes.selectCharCotainer}>
        {mainChar && (
          <div
            className={classes.charInfoContainer}
            style={{
              backgroundColor: selected === mainChar ? '#525fe4' : 'rgba(82, 95, 228, 0.8)',
            }}
            onClick={() => setSelected(mainChar)}
          >
            <div className={classes.charInfo}>
              <Image src={mainChar!.character_image} alt="mainChar" width={110} height={110} />
              <div className={classes.charInfoText}>
                <h3>
                  <Image
                    src={getServerImage(mainChar!.world_name as ServerName)}
                    alt="world_icon"
                    width={15}
                    height={15}
                  />

                  {mainChar!.character_name}
                </h3>
                <p>
                  {mainChar!.character_level}Lv ({mainChar!.character_exp_rate}%)
                </p>
                <p>{mainChar!.character_class}</p>
                <p>길드 : {mainChar!.character_guild_name}</p>
              </div>
            </div>
            <p className={classes.selectMsg}> {selected === mainChar ? '선택됨' : ' '}</p>
          </div>
        )}
        {searchedChar ? (
          <div
            className={classes.charInfoContainer}
            style={{
              backgroundColor: selected === searchedChar ? '#525fe4' : 'rgba(82, 95, 228, 0.8)',
            }}
            onClick={() => setSelected(searchedChar)}
          >
            <div className={classes.charInfo}>
              <Image src={searchedChar!.character_image} alt="mainChar" width={110} height={110} />
              <div className={classes.charInfoText}>
                <h3>
                  <Image
                    src={getServerImage(searchedChar!.world_name as ServerName)}
                    alt="world_icon"
                    width={15}
                    height={15}
                  />

                  {searchedChar!.character_name}
                </h3>
                <p>
                  {searchedChar!.character_level}Lv ({searchedChar!.character_exp_rate}%)
                </p>
                <p>{searchedChar!.character_class}</p>
                <p>길드 : {searchedChar!.character_guild_name}</p>
              </div>
            </div>
            <p className={classes.selectMsg}> {selected === searchedChar ? '선택됨' : ' '}</p>
            <div className={classes.deleteBtn} onClick={() => setSearchedChar(null)}>
              <MdDeleteOutline color="white" size={15} /> <span>삭제</span>
            </div>
          </div>
        ) : (
          <div className={classes.subCharContainer} onClick={() => setIsOpen(true)}>
            <FaSearch color="white" /> <p>캐릭터 검색해서 추가하기</p>
          </div>
        )}
      </div>
      {isOpen && (
        <SearchModal
          mainChar={mainChar!}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsOpen={setIsOpen}
          setSearchedChar={setSearchedChar}
        />
      )}
      <div className={classes.btnContainer}>
        <button onClick={handleNext}>선택하기</button>
        <button onClick={handlePrev}>{findResult!.length <= 1 ? '다시찾기' : '다시선택'}</button>
      </div>
    </div>
  );
}
