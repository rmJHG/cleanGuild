import { postStore } from '@/store/postStore';
import classes from './_styles/contactInfo.module.css';
import { errorModal } from '@/app/_lib/errorModal';
import { useState } from 'react';

export default function ContactInfo({
  onNext,
  onPrev,
  guildMember,
  guildMasterName,
}: {
  onNext: () => void;
  onPrev: () => void;
  guildMember: string[];
  guildMasterName: string;
}) {
  const { openKakaotalkLink, discordLink, managerNameArr, setPostState } = postStore();
  function isValidKakaoURL(string: string) {
    const pattern = new RegExp('^https:\\/\\/open\\.kakao\\.com\\/o\\/.+', 'i');
    return !!pattern.test(string);
  }
  function isValidDiscordURL(string: string) {
    const pattern = new RegExp('^https:\\/\\/discord\\.gg\\/.+', 'i');
    return !!pattern.test(string);
  }

  const [managerName, setManagerName] = useState<string>('');
  const changeManagerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManagerName(e.target.value);
  };
  const handleAddManager = () => {
    if (managerNameArr.length >= 5) {
      return errorModal('인게임 문의는 최대 5명까지 추가할 수 있습니다.');
    }

    const newManagerName = managerName.trim();
    setManagerName('');
    if (!newManagerName) {
      return errorModal('캐릭터명을 입력해주세요.');
    }
    if (newManagerName === guildMasterName) {
      return errorModal('본인은 추가할 수 없습니다');
    }
    if (!guildMember.includes(newManagerName)) {
      return errorModal('길드원이 아닌 캐릭터명은 추가할 수 없습니다.');
    }
    if (managerNameArr.includes(newManagerName)) {
      return errorModal('이미 추가된 캐릭터명입니다.');
    }

    setPostState({ managerNameArr: [...managerNameArr, newManagerName] });
  };

  const handleNext = () => {
    if (openKakaotalkLink && !isValidKakaoURL(openKakaotalkLink))
      return errorModal('올바른 카카오톡 링크를 입력해주세요.');
    if (discordLink && !isValidDiscordURL(discordLink))
      return errorModal('올바른 디스코드 링크를 입력해주세요.');
    onNext();
  };
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h2>길드 홍보 ( 3 / 4 )</h2>
        <p>문의 수단을 설정해주세요.</p>
      </header>
      <div className={classes.infoContainer}>
        <section>
          <p>오픈채팅 링크(선택)</p>
          <input
            type="text"
            placeholder="초대링크"
            onChange={(e) => {
              setPostState({ openKakaotalkLink: e.target.value });
            }}
          />
        </section>
        <section>
          <p>디스코드 초대 링크(선택)</p>
          <input
            type="text"
            placeholder="초대링크"
            onChange={(e) => {
              setPostState({ discordLink: e.target.value });
            }}
          />
        </section>
        <section>
          <div className={classes.addCharNameHeaderContainer}>
            <div>
              <p>인게임 문의</p>
              <p>(본인을 제외한 최대 5명)</p>
            </div>
            <div className={classes.addCharBtnContainer}>
              <input
                type="text"
                placeholder="캐릭터명"
                value={managerName}
                onChange={changeManagerName}
                onKeyDown={(e) => {
                  if (e.keyCode === 229) return;
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddManager();
                  }
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddManager();
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className={classes.resultContainer}>
            {managerNameArr.map((name, i) => (
              <div key={i} className={classes.charNameContainer}>
                <span>{name}</span>
                <button
                  onClick={() =>
                    setPostState({ managerNameArr: managerNameArr.filter((_, j) => i !== j) })
                  }
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className={classes.btnContainer}>
        <button onClick={onPrev}>이전으로</button>
        <button onClick={handleNext}>다음으로</button>
      </div>
    </div>
  );
}
