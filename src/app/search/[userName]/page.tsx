import CharInfo from "../_component/CharInfo";
import SearchBar from "@/app/_component/SearchBar";

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
