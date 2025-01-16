import { postStore } from '@/store/postStore';
import classes from './_styles/contactInfo.module.css';
import { errorModal } from '@/app/_lib/errorModal';
import { useRef, useState } from 'react';

import { CiSquarePlus } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';

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
  const [isFocused, setIsFocused] = useState<string>('');
  const [managerName, setManagerName] = useState<string>('');
  const managerNameRef = useRef<HTMLInputElement>(null);
  const discordLinkRef = useRef<HTMLInputElement>(null);
  const openKakaotalkLinkRef = useRef<HTMLInputElement>(null);

  function isValidKakaoURL(string: string) {
    const pattern = new RegExp('^https:\\/\\/open\\.kakao\\.com\\/o\\/.+', 'i');
    return !!pattern.test(string);
  }
  function isValidDiscordURL(string: string) {
    const pattern = new RegExp('^https:\\/\\/discord\\.gg\\/.+', 'i');
    return !!pattern.test(string);
  }

  const handleAddManager = (name: string) => {
    const managerName = name;

    if (managerNameArr.length >= 4) {
      return errorModal('인게임 문의는 최대 4명까지 추가할 수 있습니다.');
    }
    if (managerName === guildMasterName) {
      return errorModal('길드마스터는 추가할 수 없습니다.');
    }

    const newManagerName = managerName.trim();

    if (!newManagerName) {
      return errorModal('캐릭터명을 입력해주세요.');
    }

    if (!guildMember.includes(newManagerName)) {
      return errorModal('길드원이 아닌 캐릭터명은 추가할 수 없습니다.');
    }
    if (managerNameArr.includes(newManagerName)) {
      return errorModal('이미 추가된 캐릭터명입니다.');
    }

    setPostState({ managerNameArr: [...managerNameArr, newManagerName] });
    managerNameRef.current!.value = '';
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
        <div className={classes.contactContainer}>
          <div
            className={`${classes.linkContainer} ${
              isFocused === 'discordLink' ? classes.focused : ''
            }`}
            onClick={() => discordLinkRef.current?.focus()}
          >
            <span>디스코드 링크 (선택 사항)</span>
            <input
              type="text"
              placeholder="디스코드 링크를 입력해주세요."
              defaultValue={discordLink}
              ref={discordLinkRef}
              onChange={(e) => {
                setPostState({ discordLink: e.target.value });
              }}
              onFocus={() => setIsFocused('discordLink')}
              onBlur={() => setIsFocused('')}
            />
          </div>
          <div
            className={`${classes.linkContainer} ${
              isFocused === 'openKakaotalkLink' ? classes.focused : ''
            }`}
            onClick={() => openKakaotalkLinkRef.current?.focus()}
          >
            <span>오픈 카카오톡 링크 (선택 사항)</span>
            <input
              type="text"
              placeholder="오픈 카카오톡 링크를 입력해주세요."
              defaultValue={openKakaotalkLink}
              ref={openKakaotalkLinkRef}
              onChange={(e) => {
                setPostState({ openKakaotalkLink: e.target.value });
              }}
              onFocus={() => setIsFocused('openKakaotalkLink')}
              onBlur={() => setIsFocused('')}
            />
          </div>
          <div className={classes.guildManagerContainer}>
            <div className={classes.managerHeader}>
              <span>길드매니저</span>
              <span>{managerNameArr.length} / 4</span>
            </div>
            <div>
              <div className={classes.addInputContainer}>
                <input
                  type="text"
                  ref={managerNameRef}
                  onKeyDown={(e) => {
                    if (e.keyCode === 229) return;
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddManager(e.currentTarget.value);
                    }
                  }}
                />
                <IoIosAdd
                  size={20}
                  onClick={() => {
                    handleAddManager(managerNameRef.current!.value);
                  }}
                />
              </div>
              <ul>
                {managerNameArr.map((name, i) => (
                  <li key={i} className={classes.managerName}>
                    <span>{name}</span>
                    <AiOutlineDelete
                      size={20}
                      onClick={() => {
                        setPostState({
                          managerNameArr: managerNameArr.filter((e) => e !== name),
                        });
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.btnContainer}>
        <button onClick={onPrev}>
          <p>이전으로</p>
        </button>
        <button onClick={handleNext}>
          <p>다음으로</p>
        </button>
      </div>
    </div>
  );
}
