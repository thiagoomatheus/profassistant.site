import { NextRequest, NextResponse } from "next/server";

export async function middleware (request: NextRequest) {
    const session = request.cookies.get("session");

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //Call the authentication endpoint
  const responseAPI = await fetch("/api/login", {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
