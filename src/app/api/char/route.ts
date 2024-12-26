import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const { character_name } = await req.json();

  try {
    const getOcidData = await fetch(
      `https://open.api.nexon.com/maplestory/v1/id?character_name=${character_name}`,
      {
        method: 'GET',
        headers: {
          'x-nxopen-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
        },
      }
    );
    const ocidRes = await getOcidData.json();
    if (!ocidRes.ocid)
      return NextResponse.json({ error: 'ocid를 가져오는데 실패했습니다' }, { status: 500 });
    const getCharData = await fetch(
      `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocidRes.ocid}`,
      {
        headers: {
          'x-nxopen-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
        },
      }
    );
    if (!getCharData.ok)
      return NextResponse.json(
        { error: '캐릭터 정보를 가져오는데 실패했습니다.' },
        { status: 500 }
      );
    const getCharPopData = await fetch(
      `https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${ocidRes.ocid}`,
      {
        headers: {
          'x-nxopen-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
        },
      }
    );
    if (!getCharPopData.ok)
      return NextResponse.json(
        { error: '캐릭터 인기도정보를 가져오는데 실패했습니다.' },
        { status: 500 }
      );
    const popRes = await getCharPopData.json();
    const charRes = await getCharData.json();
    const data = {
      popularity: popRes.popularity,
      ...charRes,
      ocid: ocidRes.ocid,
    };
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '캐릭터 정보를 가져오는데 실패했습니다.' }, { status: 500 });
  }
}
