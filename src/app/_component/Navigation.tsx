import Link from "next/link";

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/find">길드찾기</Link>
      </li>
      <li>
        <Link href="/post">길드홍보</Link>
      </li>
    </ul>
  );
}
