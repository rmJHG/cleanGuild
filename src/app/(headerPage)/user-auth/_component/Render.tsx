'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Example from './Example';
import CheckList from './CheckList';
import FindMainChar from './FindMainChar';
import { Char } from '@/types/char';
import SaveImage from './SaveImage';
import SelectMainChar from './SelectMainChar';
import MainOrSubChar from './MainOrSubChar';

const charData = [
  {
    access_flag: 'true',
    character_class: '히어로',
    character_class_level: '6',
    character_date_create: '2019-12-19T00:00+09:00',
    character_exp: 9326973643221,
    character_exp_rate: '61.593',
    character_gender: '여',
    character_guild_name: '꽁냥꽁냥',
    character_image:
      'https://open.api.nexon.com/static/maplestory/character/look/MMINCFPBOMABNCBNOGEMOKEGGPLABDHKFHBDHPAJFEFKOFHCGJPJAJHCPBIAFKPJOFGICKKMGLPHCFADMOMJKEAMJHBABJOPBCHHPOPNBGNKIHCJHLADBGEJBAFMGBAGKDFCKNHNOGPNFMMGNBNNKJGBLDAMCLHFCGFIAKHFHKGEINFKHCDFAGNKIFFKAABNCPLKOAIIHBGKAOBMFHPBKJALMGDIDJEEONILMDABFIFHJDCOHOPKIJLJGCCFNLPO',
    character_level: 278,
    character_name: '팔보채비벼줘',
    date: null,
    liberation_quest_clear_flag: 'false',
    ocid: 'a5a09c28d7918653490aa203d2707631',
    popularity: 4,
    world_name: '루나',
  },
  {
    access_flag: 'true',
    character_class: '히어로',
    character_class_level: '6',
    character_date_create: '2019-12-19T00:00+09:00',
    character_exp: 9326973643221,
    character_exp_rate: '61.593',
    character_gender: '여',
    character_guild_name: '꽁냥꽁냥',
    character_image:
      'https://open.api.nexon.com/static/maplestory/character/look/MMINCFPBOMABNCBNOGEMOKEGGPLABDHKFHBDHPAJFEFKOFHCGJPJAJHCPBIAFKPJOFGICKKMGLPHCFADMOMJKEAMJHBABJOPBCHHPOPNBGNKIHCJHLADBGEJBAFMGBAGKDFCKNHNOGPNFMMGNBNNKJGBLDAMCLHFCGFIAKHFHKGEINFKHCDFAGNKIFFKAABNCPLKOAIIHBGKAOBMFHPBKJALMGDIDJEEONILMDABFIFHJDCOHOPKIJLJGCCFNLPO',
    character_level: 278,
    character_name: 'test2',
    date: null,
    liberation_quest_clear_flag: 'false',
    ocid: 'a5a09c28d7918653490aa203d2707631',
    popularity: 4,
    world_name: '루나',
  },
];

type Step = 1 | 2 | 3 | 4 | 5 | 6;
export type ResetStateParams = {
  img?: boolean;
  findResult?: boolean;
  mainChar?: boolean;
  selectedChar?: boolean;
  searchedChar?: boolean;
};
export default function Render({ setSubTitle }: { setSubTitle: Dispatch<SetStateAction<string>> }) {
  const [pageState, setPageState] = useState<Step>(1);
  const [img, setImg] = useState<File | null>(null);
  const [findResult, setFindResult] = useState<Char[] | null>(charData);
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
        setSubTitle('길드를 홍보하려면 핸즈 인증이 필요합니다.');
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
          />
        );
    }
  };
  return <>{renderStep()}</>;
}
