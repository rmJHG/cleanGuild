import ServerList from "./_component/ServerList";

export default function Page() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", flex: "1" }}>
      <ServerList />
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flex: "1" }}>
        <p>서버를 선택해주세요.</p>
      </div>
    </div>
  );
}
