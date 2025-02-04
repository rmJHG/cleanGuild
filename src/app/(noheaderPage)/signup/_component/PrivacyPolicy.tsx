import classes from './_styles/privacyPolicy.module.css';

const data = [
  {
    title: '1. 수집하는 개인정보 항목',
    content: [
      '회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.',
      '수집 항목: 이메일, 캐릭터 ocid, 핸즈 이미지',
    ],
  },
  {
    title: '2. 개인정보 이용 목적',
    content: [
      '회사는 수집한 개인정보를 다음의 목적을 위해 사용합니다.',
      '이용 목적: 회원 식별 및 서비스 제공',
    ],
  },
  {
    title: '3. 개인정보 보유 및 이용 기간',
    content: [
      '회사는 이용자가 회원가입을 하지 않은 경우, 이용자의 개인정보를 수집하지 않습니다.',
      '회원가입 후, 이용자가 회원탈퇴를 요청하면, 탈퇴 요청일로부터 7일간 개인정보를 보관한 후, 즉시 삭제됩니다.',
      ,
      '이는 재가입 제한을 위해 필요한 최소한의 정보를 보관하기 위한 것으로, 해당 기간 동안 개인정보는 다른 용도로 사용되지 않습니다.',
    ],
  },
  {
    title: '4. 개인정보의 파기 절차 및 방법',
    content: [
      '회사는 이용자의 개인정보를 수집 및 이용목적이 달성된 후 즉시 파기합니다.',
      '파기 절차: 이용자가 회원탈퇴를 요청한 경우, 회사는 이용자의 개인정보를 탈퇴 요청일로부터 7일간 보관 후, 해당 기간이 경과하면 즉시 삭제합니다. 보관 기간 동안 개인정보는 재가입 제한 목적 외의 용도로 사용되지 않습니다.',
      ,
      '파기 방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.',
    ],
  },
  {
    title: '5. 개인정보의 제3자 제공',
    content: [
      '회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 따라 요청받은 경우에는 예외로 제공될 수 있습니다.',
      '또한, 회사는 광고 제공을 위해 외부 광고 서버 제휴 업체를 활용할 수 있으며, 이들은 개인 정보를 제외한 사용자의 웹사이트 방문 기록을 기반으로 사용자에게 적합한 광고를 제공합니다.',
    ],
  },
  {
    title: '6. 이용자의 권리 및 행사 방법',
    content: [
      '이용자는 언제든지 회사에 대해 개인정보 열람, 정정, 삭제, 처리 정지 등을 요청할 수 있습니다.',
      '이용자는 회사의 개인정보 관리자에게 이메일로 요청할 수 있습니다.',
    ],
  },
  {
    title: '7. 쿠키 및 유사 기술 사용',
    content: [
      '회사는 회원이 제공하는 서비스를 개선하기 위해 쿠키를 자동으로 수집할 수 있습니다.',
      '회원은 쿠키 수집을 허용하거나 거부할 수 있으며, 거부할 경우 일부 서비스 이용에 어려움이 있을 수 있습니다.',
    ],
  },
  {
    title: '쿠키 거부 방법:',
    content: [
      'Chrome: 우측 상단 메뉴 > 설정 > 개인정보 및 보안 > 사이트 설정 메뉴에서 쿠키 설정을 변경할 수 있습니다.',
    ],
  },
  {
    title: '8. 개인정보 처리방침의 변경',
    content: [
      '회사는 개인정보 처리방침을 변경할 수 있으며, 변경된 방침은 회사의 홈페이지에 공지됩니다.',
    ],
  },
];
export default function PrivacyPolicy() {
  return (
    <div className={classes.container}>
      <ul>
        <li>
          <h2>개인정보 수집 및 이용 동의서</h2>
        </li>
        <li>
          <p>
            메이플그레미오(이하 "회사"라 함)는 이용자의 개인정보를 중요시하며, 본 동의서는 이용자가
            제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있는지, 그리고 개인정보 보호를 위해
            어떤 조치가 취해지는지에 대해 설명드립니다. 이용자는 본 동의서에 대해 충분히 이해한 후,
            동의 여부를 선택해야 합니다.
          </p>
        </li>
        <li></li>
        {data.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            {item.content.map((content, index) => (
              <p key={index}>{content}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
