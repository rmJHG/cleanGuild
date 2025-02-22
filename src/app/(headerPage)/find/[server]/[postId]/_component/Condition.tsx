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
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {!value ? (
            '제한없음'
          ) : (
            <>
              {value}점 {<FaCaretUp color="red" />}
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

        <span style={{ display: 'flex', alignItems: 'center' }}>
          {!value ? (
            '제한없음'
          ) : (
            <>
              {value}점 {<FaCaretUp color="red" />}
            </>
          )}
        </span>
      </div>
    );
  }
  return (
    <div>
      <span>레벨 제한</span>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {!value ? (
          '제한없음'
        ) : (
          <>
            Lv{value} {<FaCaretUp color="red" />}
          </>
        )}
      </span>
    </div>
  );
}
