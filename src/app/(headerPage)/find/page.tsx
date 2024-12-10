import ServerList from './_component/ServerList';

export default function Page() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{}}>
        <ServerList />
      </div>
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '1',
        }}
      >
        <p>서버를 선택해주세요.</p>
      </div>
    </div>
  );
}
