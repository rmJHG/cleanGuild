import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import CharInfo from "../_component/CharInfo";
import SearchBar from "@/app/_component/SearchBar";
import { getSearchResult } from "../_lib/getSearchResult";

type Props = {
  params: { userName: string };
};
export default async function Page({ params }: Props) {
  const { userName } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["search", "user", userName],
    queryFn: getSearchResult,
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={dehydrateState}>
        <div>
          <SearchBar />
        </div>
        <div>
          <CharInfo userName={userName} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
