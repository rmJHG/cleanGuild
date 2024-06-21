type Props = {
  guildName: string;
};

export default function Guild({ guildName }: Props) {
  return <li>{guildName}</li>;
}
