import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const { ocid } = await req.json();

  try {
    const getCharData = await fetch(
      `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
      {
        headers: {
          'x-nxopen-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
        },
      }
    );
    const { character_name, character_image, character_guild_name, world_name } =
      await getCharData.json();

    const handsData = {
      character_name,
      character_image,
      character_guild_name,
      world_name,
    };

    return NextResponse.json(handsData);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '캐릭터 정보를 가져오는데 실패했습니다.' }, { status: 500 });
  }
}
