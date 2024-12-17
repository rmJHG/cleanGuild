import { Char } from '@/types/char';
import Image from 'next/image';
import classes from './styles/searchedChar.module.css';
import { serverList } from '@/app/serverList';
import Loading from '@/app/_components/layout/Loading';

export default function SearchedChar({ data }: { data: Char | null }) {
  if (!data)
    return (
      <div className={classes.container}>
        <Loading />
      </div>
    );
  if (data.error)
    return (
      <div className={classes.error}>
        <p>유저 결과가 없습니다</p>
      </div>
    );
  const {
    popularity,
    character_name,
    character_class,
    character_guild_name,
    character_image,
    character_level,
    world_name,
    character_date_create,
    character_exp_rate,
  } = data;

  const [[icon, _1]] = serverList.filter((f) => {
    return f[1] === world_name;
  });
  console.log(data);
  return (
    <div className={classes.container}>
      <div className={classes.charImage}>
        <Image
          src={character_image}
          alt="userMainCharacterImage"
          width={150}
          height={150}
          priority
        />
        <p className={classes.birth}>birth : {character_date_create.slice(0, 10)}</p>
      </div>
      <div className={classes.charInfo}>
        <p className={classes.charName}>
          {icon && <Image src={icon} alt={world_name} width={15} height={15} priority />}
          {character_name}
        </p>
        <p>
          Lv {character_level} ({character_exp_rate}%)
        </p>
        <p>{character_class}</p>
        <p>인기도 {popularity}</p>
        <p>길드 {character_guild_name || '없음'}</p>
      </div>
    </div>
  );
}
