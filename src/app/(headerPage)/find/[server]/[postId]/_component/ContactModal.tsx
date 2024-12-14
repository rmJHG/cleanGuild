import { FaDiscord } from 'react-icons/fa';
import classes from './styles/contactModal.module.css';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { successModal } from '@/app/_lib/successModal';
import { errorModal } from '@/app/_lib/errorModal';

export default function ContactModal({ ingameManager }: { ingameManager: string[] }) {
  const textCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      successModal('닉네임이 복사됐습니다.', 1000);
    } catch (error) {
      errorModal('복사에 실패했습니다.');
    }
  };

  return (
    <div className={classes.container}>
      <p>지원하기</p>
      <div className={classes.snsListContainer}>
        <FaDiscord size={30} color="#5865f2" />
        <RiKakaoTalkFill size={30} color="#FEE500" />
      </div>

      {ingameManager && (
        <div className={classes.ingameManagerList}>
          <span>또는 인게임 문의</span>
          {ingameManager.map((e) => {
            return (
              <p
                key={e}
                onClick={() => {
                  textCopy(e);
                }}
              >
                {e}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
