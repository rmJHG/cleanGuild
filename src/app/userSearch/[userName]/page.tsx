import SearchBar from "@/app/_components/SearchUserBar";
import CharInfo from "../_component/CharInfo";

type Props = {
  params: { userName: string };
};
export default async function Page({ params }: Props) {
  const { userName } = params;

  return (
    <div>
      <div>
        <SearchBar />
      </div>
      <div>
        <CharInfo userName={userName} />
      </div>
    </div>
  );
}
