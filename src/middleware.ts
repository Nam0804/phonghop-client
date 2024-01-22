import createIntlMiddleware from "next-intl/middleware";
import {NextRequest} from "next/server";

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
    const adminRoutes = [
        "company",
    ];
    const managerRoutes = [
        "room",
        "booking",
        "users",
    ];
    const userRoutes = [
        "room",
        "booking",
    ];

    const token = request.cookies.get("token")?.value;
    const type = request.cookies.get("type")?.value;

    const handleI18nRouting = createIntlMiddleware({
        locales: ["en", "vn"],
        defaultLocale: "en",
        localePrefix: "always",
    });
    let allowedRoutes = [];
    switch (type) {
        case 'admin':
            allowedRoutes = authRoutes.concat(adminRoutes);
            break;
        case 'manager':
            allowedRoutes = authRoutes.concat(managerRoutes);
            break;
        case 'user':
            allowedRoutes = authRoutes.concat(userRoutes);
            break;
        default:
            // Unknown role, redirect to login
            request.nextUrl.pathname = `/${locale}/login`;
            request.cookies.delete("token");
            return handleI18nRouting(request);
    }

    if (
        !token &&
        !allowedRoutes.includes(segments[0])
        // TODO check token expired
    ) {
        request.nextUrl.pathname = `/${locale}/login`;
        request.cookies.delete("token");
        return handleI18nRouting(request);
    }

    const response = await handleI18nRouting(request);

    if (!token) {
        response.cookies.delete("token");
    }
    return response;
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/([\\w-]+)?/users/(.+)"],
};
