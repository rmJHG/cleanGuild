import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const session = await auth();
  if (!session) {
    console.log(session);
    return NextResponse.redirect(new URL("signin", request.url));
  } else {
    return NextResponse.next();
  }
};

export const config = {
  matcher: ["/post"],
};
