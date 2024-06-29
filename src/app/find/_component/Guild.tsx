type Props = {
  guild_name: string;
  user_id: string;
};

export default function Guild({ guild_name, user_id }: Props) {
  return (
    <li>
      <div>길드이름 : {guild_name}</div>
      <div>작성자 : {user_id}</div>
    </li>
  );
}
