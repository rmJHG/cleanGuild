"use client";

import { useUserData } from "@/zustand/userDataState";
import { postAction } from "./_lib/postAction";

export default function Page() {
  const { userData } = useUserData();
  const guildTypeOption = ["친목", "랭킹", "자유"];
  const nobleOptions = Array.from({ length: 60 }, (_, i) => i + 1);
  return (
    <div>
      <form
        action={async (formData: FormData) => {
          formData.append("userData", JSON.stringify(userData));
          await postAction(formData);
        }}
      >
        <div>
          <div>
            <div>
              <p>제목</p>
            </div>
            <div>
              <input type="text" name="title" id="title" />
            </div>
          </div>
          <div>
            <p>길드설명</p>
          </div>
          <div>
            <textarea name="description" id="description" />
          </div>
        </div>
        <div>
          <div>
            <p>길드 성향</p>
          </div>
          <select name="guildType" id="guildType">
            {guildTypeOption.map((e, i) => {
              return (
                <option key={i} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <div>
            <p>현재노블</p>
          </div>
          <div>
            <select name="currentNoblePoint" id="currentNoblePoint">
              {nobleOptions.map((n) => {
                return (
                  <option key={n} value={n}>
                    {n}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <div>
            <p>목표 노블</p>
          </div>
          <div>
            <select name="goalNoblePoint" id="goalNoblePoint">
              {nobleOptions.map((n) => {
                return (
                  <option key={n} value={n}>
                    {n}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <div>
            <p>요구 레벨</p>
          </div>
          <div>
            <input type="number" name="limitedLevel" id="limitedLevel" />
            <p>이상</p>
          </div>
        </div>
        <div>
          <div>
            <p>요구 수로점수</p>
          </div>
          <div>
            <input type="number" name="suroPoint" id="suroPoint" />
            <p>이상</p>
          </div>
        </div>
        <button type="submit">
          <p>홍보하기</p>
        </button>
      </form>
    </div>
  );
}
