import CharInfo from "../_component/CharInfo";
import UserSearchBar from "@/app/_components/UserSearchBar";

type Props = {
  params: { userName: string };
};
export default async function Page({ params }: Props) {
  const { userName } = params;

  return (
    <div>
      <div>
        <UserSearchBar />
      </div>
      <div>
        <CharInfo userName={userName} />
      </div>
    </div>
  );
}
