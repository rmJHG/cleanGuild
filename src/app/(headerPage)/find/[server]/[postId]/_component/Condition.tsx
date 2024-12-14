import { FaCaretUp } from 'react-icons/fa';

export default function Condition({
  condition,
  value,
}: {
  condition: string;
  value: string | number | null;
}) {
  if (condition === 'flagPoint') {
    return (
      <div>
        <span>플래그 점수</span>
        <span>
          {!value ? (
            '제한없음'
          ) : (
            <>
              {value}점 {<FaCaretUp />}
            </>
          )}
        </span>
      </div>
    );
  }

  if (condition === 'guildContents') {
    return (
      <div>
        <span>수로, 플래그</span>
        <span>{` ${value}` || '제한없음'}</span>
      </div>
    );
  }

  if (condition === 'suroPoint') {
    return (
      <div>
        <span>수로 점수</span>

        <span>
          {!value ? (
            '제한없음'
          ) : (
            <>
              {value}점 {<FaCaretUp />}
            </>
          )}
        </span>
      </div>
    );
  }
  return (
    <div>
      <span>레벨 제한</span>
      <span>{<>{value} 이상</> || '제한없음'}</span>
    </div>
  );
}
