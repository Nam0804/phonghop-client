import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");

  const authRoutes = [
    "/login",
    "register",
    "forgotpassword",
    "resetpassword",
    "manager",
    "guest",
  ];

  const token = request.cookies.get("token")?.value;

  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "vn"],
    defaultLocale: "en",
    localePrefix: "always",
  });

  if (
    !token &&
    !authRoutes.includes(segments[0])
    // TODO check token expired
  ) {
    request.nextUrl.pathname = `/${locale}/login`;
    request.cookies.delete("token");
  }

  const response = handleI18nRouting(request);

  if (!token) {
    response.cookies.delete("token");
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/([\\w-]+)?/users/(.+)"],
};
