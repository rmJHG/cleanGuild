type Props = {
  userName: string;
  age: number;
};

export default function Data({ userName, age }: Props) {
  return (
    <li>
      {userName} // {age}
    </li>
  );
}
