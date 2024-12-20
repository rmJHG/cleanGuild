import luna from '../../public/img/world/luna.png';
import scania from '../../public/img/world/scania.png';
import arcane from '../../public/img/world/arcane.png';
import aurora from '../../public/img/world/aurora.png';
import bera from '../../public/img/world/bera.png';
import croa from '../../public/img/world/croa.png';
import elysium from '../../public/img/world/elysium.png';
import nova from '../../public/img/world/nova.png';
import red from '../../public/img/world/red.png';
import union from '../../public/img/world/union.png';
import zenis from '../../public/img/world/zenis.png';
import reboot from '../../public/img/world/reboot.png';
import burning from '../../public/img/world/burning.png';
import enosis from '../../public/img/world/enosis.png';
import eos from '../../public/img/world/eos.png';
import helios from '../../public/img/world/helios.png';

export const serverList = [
  [luna, '루나'],
  [scania, '스카니아'],
  [bera, '베라'],
  [croa, '크로아'],
  [elysium, '엘리시움'],
  [zenis, '제니스'],
  [red, '레드'],
  [aurora, '오로라'],
  [union, '유니온'],
  [nova, '노바'],
  [arcane, '아케인'],
  [enosis, '이노시스'],
  [eos, '에오스'],
  [helios, '헬리오스'],
  // [reboot, '리부트'],
  // [reboot, '리부트2'],
  [burning, '버닝'],
  [burning, '버닝2'],
  [burning, '버닝3'],
];

export const serverListTest = {
  루나: luna,
  스카니아: scania,
  베라: bera,
  크로아: croa,
  엘리시움: elysium,
  제니스: zenis,
  레드: red,
  오로라: aurora,
  유니온: union,
  노바: nova,
  아케인: arcane,
  이노시스: enosis,
  리부트: reboot,
  버닝: burning,
  에오스: eos,
  헬리오스: helios,
};
export type ServerName = keyof typeof serverListTest;
