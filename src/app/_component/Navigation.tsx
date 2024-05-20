import Link from "next/link";

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/community">Com</Link>
      </li>
      <li>
        <Link href="/report">Report</Link>
      </li>
    </ul>
  );
}
