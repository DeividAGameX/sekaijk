import {config} from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/components/dashboard/Unauthorized";
import TeamRoleForm from "@/features/teamRole/components/TeamRoleForm";
import TeamRolesHeaders from "@/features/teamRole/components/TeamRolesHeader";
import TeamRolesTable from "@/features/teamRole/components/TeamRolesTable";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";

async function TeamsPages() {
    const session = await getServerSession(config);
    if (!session) return <Unauthorized />;
    const id = (session?.user as {id: number}).id;
    const result = await validatePermission("@team-roles", id);
    if (!result) return <Unauthorized />;
    const canAdd = await validatePermission("@team-role-create", id);
    const canEdit = await validatePermission("@team-role-update", id);
    const canDelete = await validatePermission("@team-role-delete", id);
    return (
        <div className="flex flex-col w-full h-full">
            <TeamRolesHeaders canAdd={canAdd} />
            <TeamRolesTable canEdit={canEdit} canDelete={canDelete} />
            {canAdd && <TeamRoleForm />}
        </div>
    );
}

export default TeamsPages;
