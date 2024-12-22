import { MdDoNotDisturbAlt } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaQuestion } from 'react-icons/fa';
import { CiWarning } from 'react-icons/ci';
import { RiErrorWarningLine } from 'react-icons/ri';

import classes from './_styles/checkList.module.css';
export default function CheckList({ onNext }: { onNext: () => void }) {
  return (
    <div className={classes.container}>
      <div className={classes.checkListContainer}>
        <div>
          <h2>
            <FaQuestion size={25} />
            핸즈 인증이 필요한 이유
          </h2>
          <ul>
            <li>
              <FaRegCheckCircle color="var(--header-color)" /> 메인 캐릭터 정보를 저장하기 위해
              사용됩니다.
            </li>
            <li>
              <FaRegCheckCircle color="var(--header-color)" />
              중복가입을 방지하기 위해 사용됩니다.
            </li>
          </ul>
        </div>

        <div>
          <h2>
            <CiWarning size={25} />
            주의사항
          </h2>
          <ul>
            <li>
              <MdDoNotDisturbAlt color="#ce2323" /> 타인의 핸즈 이미지를 사용하지 마세요.
            </li>

            <li>
              <MdDoNotDisturbAlt color="#ce2323" />
              흐리거나 모자이크가 된 이미지는 곤란해요.
            </li>
            <li>
              <MdDoNotDisturbAlt color="#ce2323" />
              전체 월드가 아닌 본인 월드를 캡쳐해서 사용해주세요.
            </li>
            <li>
              <RiErrorWarningLine color="#ff5900" />
              인증 중 발생한 문제는 아래 이메일로 연락주세요.
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <button onClick={onNext}>확인했습니다.</button>
      </div>
    </div>
  );
}
