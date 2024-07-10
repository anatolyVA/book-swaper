import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/shared/config/routes";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  const refreshToken = cookies.get("refresh_token")?.value;

  const isProfilePage = url.includes("/profile");
  const isAuthPage =
    url.includes(ROUTES.SIGN_IN) || url.includes(ROUTES.SIGN_UP);

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(ROUTES.BOOKS, url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/sign-up/:path*", "/sign-in/:path*"],
};
