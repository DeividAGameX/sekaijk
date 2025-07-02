import {authOptions as config} from "@/utils/AuthOptions";
import Unauthorized from "@/components/dashboard/Unauthorized";
import RolForm from "@/features/roles/components/RoleForm";
import RolesHeader from "@/features/roles/components/RolesHeader";
import RolesTable from "@/features/roles/components/RolesTable";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";

async function RolesPage() {
    const session = await getServerSession(config);
    if (!session) return <Unauthorized />;
    const id = (session?.user as {id: number}).id;
    const result = await validatePermission("@roles", id);
    if (!result) return <Unauthorized />;
    const canAdd = await validatePermission("@role-create", id);
    const canEdit = await validatePermission("@role-update", id);
    const canDelete = await validatePermission("@role-delete", id);
    return (
        <div className="flex flex-col w-full h-full">
            <RolesHeader canAdd={canAdd} />
            <RolesTable canEdit={canEdit} canDelete={canDelete} />
            {canAdd && <RolForm />}
        </div>
    );
}

export default RolesPage;
