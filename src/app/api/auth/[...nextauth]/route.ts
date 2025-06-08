import NextAuth, {AuthOptions, Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {prisma} from "@/lib/prisma";

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    banner?: string | undefined | null;
    slug?: string | undefined | null;
    rolesId: number;
    createdAt: Date;
    updatedAt: Date;
    Role?: {
        Permissions?: {permission: string}[];
    };
}

export type ExtendedSession = Session & {
    user: Session["user"] & User & {token: unknown};
};

export const config: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "UserName",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "*****",
                },
            },
            async authorize(credentials) {
                const user = await prisma.users.findUnique({
                    where: {
                        name: credentials?.username,
                    },
                    omit: {
                        description: true,
                        slug: true,
                    },
                });
                if (!user) {
                    throw new Error("account_not_found");
                }
                const valid = await bcrypt.compare(
                    credentials?.password ?? "",
                    user.password
                );
                if (!valid) {
                    throw new Error("invalid_password");
                }
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.avatar,
                };
            },
        }),
    ],
    pages: {
        signIn: "/authentication",
        signOut: "/",
    },
    callbacks: {
        async jwt({token, account}) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({session, token}) {
            // Usa el token para buscar al usuario en la base de datos
            const dbUser = await prisma.users.findUnique({
                where: {id: parseInt(token?.sub ?? "0")},
                include: {
                    Roles: {include: {Permissions: true}},
                },
                omit: {
                    password: true,
                    description: true,
                    slug: true,
                    publicOrder: true,
                },
            });

            if (dbUser) {
                const extendedSession: ExtendedSession = {
                    ...session,
                    user: {
                        ...dbUser,
                        token: token.accessToken,
                    },
                };
                return extendedSession;
            }
            return session;
            // Añadir datos adicionales del usuario a la sesión, incluyendo el token JWT crudo
        },
    },
};

const handler = NextAuth(config);

export {handler as GET, handler as POST};
