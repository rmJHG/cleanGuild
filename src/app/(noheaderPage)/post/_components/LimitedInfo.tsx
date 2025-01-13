import React, { useRef, useState } from 'react';
import classes from './_styles/limitedInfo.module.css';
import Select from '@/app/_components/Select';
import { postStore } from '@/store/postStore';
import Radio from '@/app/_components/Radio';
import { errorModal } from '@/app/_lib/errorModal';
export default function LimitedInfo({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [isFocused, setIsFocused] = useState<string>('');

  const limitedLevelRef = useRef<HTMLInputElement>(null);
  const limitedSuroPointRef = useRef<HTMLInputElement>(null);
  const limitedFlagPointRef = useRef<HTMLInputElement>(null);

  const { guildContents, limitedSuroPoint, limitedLevel, limitedFlagPoint, setPostState } =
    postStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = e.target.value;
    setPostState({ [key]: value === '' ? null : Number(value) });
  };
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h2>길드 홍보 ( 2 / 4 )</h2>
        <p>가입조건을 작성해주세요.</p>
      </header>
      <div className={classes.infoContainer}>
        <div
          className={`${classes.limitedLevelContainer} ${
            isFocused === 'limitedLevel' ? classes.focused : ''
          }`}
          onClick={() => limitedLevelRef.current?.focus()}
        >
          <span>레벨 제한 (선택 사항)</span>
          <input
            type="number"
            placeholder="1~300"
            max={300}
            defaultValue={limitedLevel !== null ? limitedLevel : ''}
            ref={limitedLevelRef}
            onChange={(e) => handleInputChange(e, 'limitedLevel')}
            onFocus={() => setIsFocused('limitedLevel')}
            onBlur={() => setIsFocused('')}
          />
        </div>

        <div className={classes.guildContentsContainer}>
          <span>길드 컨텐츠</span>
          <div>
            <Radio
              setState={(value: string) => {
                setPostState({ guildContents: value });
              }}
              state={guildContents}
              value="제한없음"
            />
            <Radio
              setState={(value: string) => {
                setPostState({ guildContents: value });
              }}
              state={guildContents}
              value="택1"
            />
            <Radio
              setState={(value: string) => {
                setPostState({ guildContents: value });
              }}
              state={guildContents}
              value="둘다필수"
            />
          </div>
        </div>
        {guildContents !== '제한없음' && (
          <>
            <div
              className={`${classes.limitedContainer} ${
                isFocused === 'limitedSuroPoint' ? classes.focused : ''
              }`}
              onClick={() => limitedSuroPointRef.current?.focus()}
            >
              <div>
                <span>수로 점수 (선택 사항)</span>
              </div>
              <input
                type="number"
                placeholder="최소 점수"
                ref={limitedSuroPointRef}
                defaultValue={limitedSuroPoint || ''}
                onChange={(e) => {
                  setPostState({ limitedSuroPoint: Number(e.target.value) });
                }}
                onFocus={() => setIsFocused('limitedSuroPoint')}
                onBlur={() => setIsFocused('')}
              />
            </div>

            <div
              className={`${classes.limitedContainer} ${
                isFocused === 'limitedFlagPoint' ? classes.focused : ''
              }`}
              onClick={() => limitedFlagPointRef.current?.focus()}
            >
              <span>플래그 점수 (선택 사항)</span>
              <input
                type="number"
                placeholder="최소 점수"
                max={1000}
                ref={limitedFlagPointRef}
                defaultValue={limitedFlagPoint || ''}
                onChange={(e) => {
                  setPostState({ limitedFlagPoint: Number(e.target.value) });
                }}
                onFocus={() => setIsFocused('limitedFlagPoint')}
                onBlur={() => setIsFocused('')}
              />
            </div>
          </>
        )}
      </div>

      <div className={classes.btnContainer}>
        <button onClick={onPrev}>이전으로</button>
        <button
          onClick={() => {
            if (limitedFlagPoint && limitedFlagPoint > 1000) {
              errorModal('플래그 점수는 1000점 이하로 입력해주세요.');
              return;
            }
            if (limitedLevel && (limitedLevel < 1 || limitedLevel > 300)) {
              errorModal('레벨 제한은 1~300 사이로 입력해주세요.');
              return;
            }
            onNext();
          }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
