import React from 'react';
import classes from './_styles/limitedInfo.module.css';
import Select from '@/app/_components/Select';
import { postStore } from '@/store/postStore';
export default function LimitedInfo({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const { guildContents, limitedSuroPoint, limitedLevel, limitedFlagPoint, setPostState } =
    postStore();

  const handleSelectChange = (value: string) => {
    setPostState({ guildContents: value });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = e.target.value;
    setPostState({ [key]: value === '' ? null : Number(value) });
  };
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h2>길드 홍보 ( 2 / 4 )</h2>
        <p>가입자 조건을 설정해주세요. (제한이 없다면 빈칸)</p>
      </header>
      <div className={classes.infoContainer}>
        <div>
          <section>
            <span>Lv</span>
            <input
              type="number"
              placeholder="1~300"
              min={1}
              max={300}
              maxLength={3}
              value={limitedLevel !== null ? limitedLevel : ''}
              onChange={(e) => handleInputChange(e, 'limitedLevel')}
            />
            <span>이상</span>
          </section>
          <section className={classes.selectSection}>
            <span>길드 컨텐츠 제한</span>
            <Select
              optionsArr={['제한없음', '수로 or 플래그', '수로플래그 필수']}
              selectName={'길드 컨텐츠'}
              placeholder={'길드 컨텐츠'}
              setState={handleSelectChange}
              currentState={guildContents}
            />
          </section>
          {guildContents !== '제한없음' && (
            <>
              <section>
                <span>수로 점수</span>
                <input
                  type="number"
                  placeholder="최소 점수"
                  min="0"
                  max="999999"
                  value={limitedSuroPoint !== null ? limitedSuroPoint : ''}
                  onChange={(e) => handleInputChange(e, 'limitedSuroPoint')}
                />
              </section>
              <section>
                <span>플래그 점수</span>
                <input
                  type="number"
                  placeholder="최소 점수"
                  min="0"
                  max="1000"
                  value={limitedFlagPoint !== null ? limitedFlagPoint : ''}
                  onChange={(e) => handleInputChange(e, 'limitedFlagPoint')}
                />
              </section>
            </>
          )}
        </div>
      </div>
      <div className={classes.btnContainer}>
        <button onClick={onPrev}>이전으로</button>
        <button onClick={onNext}>다음으로</button>
      </div>
    </div>
  );
}
