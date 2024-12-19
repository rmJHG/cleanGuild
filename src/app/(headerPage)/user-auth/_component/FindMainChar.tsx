import { useEffect, useState } from 'react';
import classes from './_styles/findMainChar.module.css';
import { Char } from '@/types/char';
import { errorModal } from '@/app/_lib/errorModal';

export default function FindMainChar({
  onPrev,
  onNext,
  setImg,
  setMainChar,
  mainChar,
  img,
}: {
  onPrev: () => void;
  onNext: () => void;
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
  setMainChar: React.Dispatch<React.SetStateAction<Char[] | null>>;
  mainChar: Char[] | null;
  img: File | null;
}) {
  const [dragging, setDragging] = useState(false);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImg(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!img) {
      setDragging(true);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!img) {
      setDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (!img) {
      const file = e.dataTransfer.files?.[0] || null;
      setImg(file);
    }
  };

  useEffect(() => {
    console.log('이미지 찾기 실행');
    const findMainChar = async () => {
      if (!img) return;
      try {
        const formData = new FormData();
        formData.append('image', img);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/handsData/image/findMainCharacter`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const json = await res.json();

        if (res.ok && json.result.length > 0) {
          setMainChar(json.result);
          onNext();
          console.log(json);
        } else {
          errorModal(json.message);
          setImg(null);
        }
      } catch (error) {
        console.log(error);
        errorModal('이미지 조회에 실패했습니다.');
        setImg(null);
      }
    };

    findMainChar();
  }, [img]);

  return (
    <div className={classes.container}>
      {!mainChar && (
        <>
          <div className={classes.selectImgContainer}>
            <label htmlFor="file" className={classes.customInput}>
              <div
                className={`${classes.fileContainer} ${dragging ? classes.dragging : ''}`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {img ? '이미지 조회중입니다.' : '드래그 또는 클릭해서 이미지찾기'}
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={changeHandler}
                  rel="prefetch"
                  style={{ display: 'none' }}
                  disabled={!!img}
                />
              </div>
            </label>
          </div>
          <div className={classes.btnContainer}>
            <button onClick={onPrev}>뒤로가기</button>
          </div>
        </>
      )}
    </div>
  );
}
