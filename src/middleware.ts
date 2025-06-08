export {default} from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard/:path*",
        // "/api/v2/dashboard/:path*",
        "/preview/:path*",
    ],
};
