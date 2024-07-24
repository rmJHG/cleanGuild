import { Char } from "@/type/char";
import Image from "next/image";
import classes from "./charComponent.module.css";
export default function CharComponent({ data }: { data: Char }) {
  if (!data) return null;
  const { character_name, character_class, character_guild_name, character_image, character_level } = data;

  return (
    <div className={classes.container}>
      <div>
        <Image src={character_image} alt="userMainCharacterImage" width={100} height={100} />
      </div>
      <div className={classes.charInfo}>
        <div>
          <p>닉네임 : {character_name}</p>
        </div>
        <div>
          <p>직업 : {character_class}</p>
        </div>
        <div>
          <p> 레벨 : {character_level} </p>
        </div>

        <div>
          <p>길드 : {character_guild_name}</p>
        </div>
      </div>
    </div>
  );
}
