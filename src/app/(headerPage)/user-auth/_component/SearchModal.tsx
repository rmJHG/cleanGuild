import { useEffect, useRef } from 'react';
import classes from './_styles/searchModal.module.css';
import Loading from '@/app/_components/layout/Loading';
import { CiSearch } from 'react-icons/ci';
import { Char } from '@/types/char';
import { errorModal } from '@/app/_lib/errorModal';

type Props = {
  mainChar: Char;
  isLoading: boolean;
  setIsOpen: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setSearchedChar: (value: Char) => void;
};
export default function SearchModal({
  mainChar,
  isLoading,
  setIsOpen,
  setIsLoading,

  setSearchedChar,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchSubChar = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/char/getSubCharData?mainCharName=${mainChar?.character_name}&subCharName=${inputRef.current?.value}`
      );
      const data = await res.json();
      console.log(data, 'data');
      setIsLoading(false);

      if (res.ok) {
        setSearchedChar(data);
        setIsOpen(false);
      } else if (data.message === '해당 캐릭터는 메인 캐릭터의 서브 캐릭터가 아닙니다.') {
        errorModal(data.message);
      }
    } catch (error: any) {
      errorModal(error.message);
    }
  };
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);
  return (
    <div className={classes.modal} onClick={() => setIsOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} className={classes.modalContent}>
        {!isLoading ? (
          <>
            <div className={classes.title}>
              <h2>캐릭터 검색</h2>
            </div>
            <div className={classes.searchContainer}>
              <input
                type="text"
                placeholder="부캐릭터 닉네임"
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') fetchSubChar();
                }}
              />
              <CiSearch color="black" size={20} onClick={fetchSubChar} />
            </div>
            <div className={classes.tip}>
              <p>{mainChar?.character_name}님을 기준으로</p>
              <p>부캐릭터 검색이 가능합니다.</p>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
