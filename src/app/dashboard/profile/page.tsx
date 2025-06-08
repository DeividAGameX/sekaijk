import {config} from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/components/dashboard/Unauthorized";
import TabUser from "@/features/profile/components/TabsUser";
import UserInfo from "@/features/profile/components/UserInfo";
import UsersModel from "@/features/users/lib/UsersModel";
import {compileMarkdownToHtml} from "@/utils/MarkdownToHtml";
import {getServerSession} from "next-auth";

async function ProfilePage() {
    const session = await getServerSession(config);
    if (!session) return null;
    const id = (session?.user as {id: number}).id;
    const user = await UsersModel.findUnique({
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            banner: true,
            description: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            TeamRoles: true,
            Roles: true,
            social: true,
        },
        where: {
            id,
        },
    });
    if (!user) return <Unauthorized />;
    user.description = compileMarkdownToHtml(user.description ?? "");
    return (
        <div className="flex flex-col w-full h-full">
            <UserInfo {...user} />
            <div className="flex-1 w-full flex gap-4 overflow-hidden">
                <div className="max-w-6xl w-full h-full md:px-4 py-2">
                    <TabUser {...user} />
                </div>
                <div className="flex-1"></div>
            </div>
        </div>
    );
}

export default ProfilePage;
