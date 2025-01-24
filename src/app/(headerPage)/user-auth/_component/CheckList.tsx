import { MdDoNotDisturbAlt } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaQuestion } from 'react-icons/fa';
import { CiWarning } from 'react-icons/ci';
import { IoIosWarning } from 'react-icons/io';

import classes from './_styles/checkList.module.css';

export default function CheckList({ onNext }: { onNext: () => void }) {
  return (
    <div className={classes.container}>
      <div className={classes.checkListContainer}>
        <div>
          <h2>
            <FaQuestion size={25} />
            핸즈 인증 전 확인사항
          </h2>
          <ul>
            <li>
              <FaRegCheckCircle color="var(--header-color)" />
              <p>원활한 서비스 이용을 위해 필요합니다.</p>
            </li>
            <li>
              <FaRegCheckCircle color="var(--header-color)" />
              <p>메인 캐릭터 정보를 저장하기 위해 사용됩니다.</p>
            </li>
            <li>
              <FaRegCheckCircle color="var(--header-color)" />
              <p>중복 가입을 방지하기 위해 인증이 필요합니다.</p>
            </li>
            <li>
              <FaRegCheckCircle color="var(--header-color)" />
              <p>캐릭터는 하나만 등록할 수 있습니다.</p>
            </li>
            <li>
              <FaRegCheckCircle color="var(--header-color)" />
              <p>캐릭터 중복 여부는 메인 캐릭터를 기준으로 판단됩니다.</p>
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
              <MdDoNotDisturbAlt color="#ce2323" />
              <p>타인의 핸즈 이미지를 사용하지 마세요.</p>
            </li>

            <li>
              <MdDoNotDisturbAlt color="#ce2323" />
              <p>흐리거나 모자이크 처리된 이미지는 사용하실 수 없습니다.</p>
            </li>
            <li>
              <IoIosWarning color="#dcbe00" />
              <p>전체 월드가 아닌 본인 월드를 캡처해서 사용해주세요.</p>
            </li>
            <li>
              <IoIosWarning color="#dcbe00" />
              <p>인증 중 발생한 문제는 화면 아래 이메일로 연락주세요.</p>
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
