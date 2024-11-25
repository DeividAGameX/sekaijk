import {getServerSession} from "next-auth/next";
import {config} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";

function withValidate(Element: any, permission: string) {
    return async function WrapperComponent(props: any) {
        const session = await getServerSession(config);
        if (!session?.user) {
            redirect("/dashboard/403");
        }
        const rol = (session.user as {rolesId: number}).rolesId;
        const permiso = await prisma.permissions.findFirst({
            where: {
                roleId: rol,
                permissions: permission,
            },
        });
        if (!permiso) {
            redirect("/dashboard/403");
        }
        return <Element {...props} />;
    };
}

export default withValidate;
