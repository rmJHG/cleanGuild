import Link from "next/link";
import classes from "./styles/serverList.module.css";
import { serverList } from "@/app/serverList";
import Image from "next/image";

type Props = {
  clicked?: string;
};

export default function ServerList({ clicked }: Props) {
  return (
    <ul className={classes.serverContainer}>
      {serverList.map((e, i) => {
        const world_name = e[1] as string;
        return (
          <li
            key={world_name + i}
            className={classes.serverItem}
            style={{ backgroundColor: world_name === clicked ? "#ffffff7f" : "transparent" }}
          >
            <Link href={`/find/${world_name}`}>
              <Image src={e[0]} alt={world_name + "find"} />
              <p>{world_name}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
