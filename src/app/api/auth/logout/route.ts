import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    cookies().delete('_Loya');
    return NextResponse.json({ message: '쿠키가 성공적으로 삭제되었습니다.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
