import useCharStore from "@/zustand/charData";
import Image from "next/image";

export default function CharInfo() {
  const data = useCharStore((state) => state.data);

  if (data === null) {
    return <div>입력대기중</div>;
  }
  return !data?.error ? (
    <div>
      <div>
        <p> {data!.character_name}</p> <p>{data!.character_gender}캐</p>
      </div>
      <div></div>
      <div>
        <Image src={data!.character_image} alt="" width={100} height={100} />
      </div>
    </div>
  ) : (
    <div>
      <p>올바르지 않은 사용자입니다.</p>
    </div>
  );
}
