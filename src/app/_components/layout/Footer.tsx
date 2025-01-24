'use client';
import Link from 'next/link';
import CharacterImage from '../CharacterImage';
import classes from './styles/footer.module.css';

import { MdOutlineEmail } from 'react-icons/md';
import { successModal } from '@/app/_lib/successModal';

export default function Footer() {
  const email = 'service@maplegremio.com';
  const handleEmail = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        successModal('이메일 주소가 복사되었습니다.', 1000);
      })
      .catch((err) => {
        console.error('이메일 주소 복사에 실패했습니다.', err);
      });
  };

  return (
    <div className={classes.footerWrapper}>
      <div>
        <Link href={'/privacy'} className={classes.privacy}>
          개인정보 처리방침
        </Link>
        <div className={classes.gap}></div>
        <p className={classes.email} onClick={handleEmail}>
          service@maplegremio.com
        </p>
      </div>
      <p>
        Data based on <span style={{ fontFamily: 'SBAggroB' }}>NEXON OPEN API</span>
      </p>

      <div className={classes.charWrapper}>
        <CharacterImage />
      </div>
    </div>
  );
}
