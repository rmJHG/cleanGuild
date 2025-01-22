import Image from 'next/image';
import classes from './_styles/example.module.css';
import goodImg from '../../../../../public/img/goodImg.png';
import badImg from '../../../../../public/img/badImg.jpeg';

export default function Example({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className={classes.container}>
      <div className={classes.infoContainer}>
        <div>
          <p>(올바른 이미지 예시)</p>
          <Image
            src={goodImg}
            alt="ExampleImage"
            width={2000}
            height={2000}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
          />
        </div>
        <div>
          <p>(잘못된 이미지 예시)</p>
          <Image
            src={badImg}
            alt="ExampleImage"
            width={2000}
            height={2000}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      <div className={classes.btnContainer}>
        <button onClick={onPrev}>이전으로</button>
        <button onClick={onNext}>확인했습니다.</button>
      </div>
    </div>
  );
}
