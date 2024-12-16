import { FaDiscord } from 'react-icons/fa';
import classes from './styles/contactModal.module.css';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { successModal } from '@/app/_lib/successModal';
import { errorModal } from '@/app/_lib/errorModal';
import { CiLink } from 'react-icons/ci';
import { FaRegCopy } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
export default function ContactModal({
  ingameManager,

  openKakaotalkLink,
  discordLink,
}: {
  ingameManager: string[];

  openKakaotalkLink?: string;
  discordLink?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const textCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      successModal('닉네임이 복사됐습니다.', 1000);
    } catch (error) {
      errorModal('복사에 실패했습니다.');
    }
  };
  console.log(!openKakaotalkLink, openKakaotalkLink);
  console.log(!discordLink, discordLink);

  return (
    <div className={`${classes.container} ${isOpen ? classes.open : ''}`}>
      {isOpen && (
        <div
          className={classes.innerContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={classes.contactContainer}>
            <div className={classes.snsListContainer}>
              <div>
                <span>SNS</span>
              </div>
              <div>
                <div>
                  {discordLink ? (
                    <Link href={discordLink as string} target="_blank">
                      <FaDiscord size={25} color="#5865f2" />
                      <span>디스코드</span> <CiLink size={25} />
                    </Link>
                  ) : (
                    <div className={classes.disabledLink}>
                      <FaDiscord size={25} color="gray" />
                      <span>디스코드</span> <CiLink size={25} />
                    </div>
                  )}
                </div>

                <div>
                  {openKakaotalkLink ? (
                    <Link href={openKakaotalkLink as string} target="_blank">
                      <RiKakaoTalkFill size={25} color={openKakaotalkLink ? '#FEE500' : 'gray'} />
                      <span>오픈채팅</span>
                      <CiLink size={25} />
                    </Link>
                  ) : (
                    <div className={classes.disabledLink}>
                      <RiKakaoTalkFill size={25} color="gray" />
                      <span>오픈채팅</span>
                      <CiLink size={25} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={classes.ingameManagerListContainer}>
              <div>
                <span>인게임 문의</span>
              </div>
              <div>
                {ingameManager.map((e, i) => {
                  return (
                    <button
                      key={`ingameManager${i}`}
                      onClick={() => {
                        textCopy(e);
                      }}
                    >
                      {e}
                      <FaRegCopy size={14} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={classes.btnWrapper}>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span style={{ lineHeight: '20px' }}>지원하기</span>
          {isOpen ? <FaChevronDown size={20} /> : <FaChevronUp size={20} />}
        </button>
      </div>
    </div>
  );
}
