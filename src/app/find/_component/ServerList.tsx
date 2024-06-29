import Link from "next/link";

export default function ServerList() {
  const serverList = [
    "루나",
    "스카니아",
    "베라",
    "크로아",
    "엘리시움",
    "제니스",
    "레드",
    "오로라",
    "유니온",
    "이노시스",
    "아케인",
    "노바",
    "리부트",
  ];

  return (
    <ul>
      {serverList.map((e, i) => {
        return <Link href={`/find/${e}`}>{e}</Link>;
      })}
    </ul>
  );
}
