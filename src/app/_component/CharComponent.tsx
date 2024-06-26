import { Char } from "@/type/char";
import Image from "next/image";

export default function CharComponent({ data }: { data: Char }) {
  if (!data) return null;
  const { character_name, character_class, character_gender, character_guild_name, character_image, character_level } =
    data;
  return (
    <div>
      <div>
        <Image src={character_image} alt="" width={100} height={100} />
      </div>
      <div>
        <div>
          <p>
            {character_name}({character_gender})/ {character_class}
          </p>
        </div>
        <div>
          <p>
            {character_level} {character_guild_name}
          </p>
        </div>
      </div>
    </div>
  );
}
