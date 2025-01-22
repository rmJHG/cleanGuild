'use client';
import classes from './handsRender.module.css';
import { useEffect, useState } from 'react';

import { Char } from '@/types/char';
import CheckList from './_components/CheckList';
import Example from './_components/Example';
import FindMainChar from './_components/FindMainChar';

import MainOrSubChar from './_components/MainOrSubChar';
import SaveImage from './_components/SaveImage';
import SelectMainChar from './_components/SelectMainChar';

type Step = 1 | 2 | 3 | 4 | 5 | 6;
export type ResetStateParams = {
  img?: boolean;
  findResult?: boolean;
  mainChar?: boolean;
  selectedChar?: boolean;
  searchedChar?: boolean;
};
export default function HandsRender({ accessToken }: { accessToken: string }) {
  const [subTitle, setSubTitle] = useState<string>('서비스 이용을 위해 핸즈 인증이 필요합니다.');
  const [pageState, setPageState] = useState<Step>(1);
  const [img, setImg] = useState<File | null>(null);
  const [findResult, setFindResult] = useState<Char[] | null>(null);
  const [mainChar, setMainChar] = useState<Char | null>(null);
  const [searchedChar, setSearchedChar] = useState<Char | null>(null);
  const [selectedChar, setSelectedChar] = useState<Char | null>(null);

  const resetState = ({
    img = false,
    findResult = false,
    mainChar = false,
    selectedChar = false,
    searchedChar = false,
  }: ResetStateParams): void => {
    img && setImg(null);
    findResult && setFindResult(null);
    mainChar && setMainChar(null);
    selectedChar && setSelectedChar(null);
    searchedChar && setSearchedChar(null);
  };
  useEffect(() => {
    switch (pageState) {
      case 1:
        setSubTitle('서비스 이용을 위해 핸즈 인증이 필요합니다.');
        break;
      case 2:
        setSubTitle('핸즈인증을 위한 예시');
        break;
      case 3:
        setSubTitle('핸즈 이미지로 메인캐릭터 찾기');
        break;
      case 4:
        setSubTitle('이미지에서 찾은 캐릭터 중 본인의 캐릭터를 선택해주세요.');
        break;
      case 5:
        setSubTitle('캐릭터 선택 또는 추가하기');
        break;
      case 6:
        setSubTitle('저장하려는 캐릭터를 확인해주세요');
        break;
    }
  }, [pageState]);
  const renderStep = () => {
    const handleNext = (nextStep: Step) => {
      setPageState(nextStep);
    };

    const handlePrev = (prevStep: Step) => {
      setPageState(prevStep);
    };

    switch (pageState) {
      case 1:
        return <CheckList onNext={() => handleNext(2)} />;
      case 2:
        return <Example onNext={() => handleNext(3)} onPrev={() => handlePrev(1)} />;
      case 3:
        return (
          <FindMainChar
            onPrev={() => handlePrev(2)}
            onNext={() => handleNext(4)}
            setImg={setImg}
            setFindResult={setFindResult}
            img={img}
          />
        );
      case 4:
        return (
          <SelectMainChar
            resetState={() => resetState}
            findResult={findResult}
            setMainChar={setMainChar}
            onPrev={() => handlePrev(3)}
            onNext={() => {
              handleNext(5);
            }}
          />
        );
      case 5:
        return (
          <MainOrSubChar
            resetState={resetState}
            findResult={findResult}
            mainChar={mainChar}
            searchedChar={searchedChar}
            setSearchedChar={setSearchedChar}
            setSelectedChar={setSelectedChar}
            onNext={() => handleNext(6)}
            onPrev={() => handlePrev(4)}
          />
        );
      case 6:
        return (
          <SaveImage
            onPrev={() => handlePrev(4)}
            img={img}
            mainChar={mainChar}
            selectedChar={selectedChar}
            accessToken={accessToken}
          />
        );
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h2>핸즈 인증</h2>
        <p>{subTitle}</p>
      </div>
      <div className={classes.contentContainer}>{renderStep()}</div>
    </div>
  );
}
