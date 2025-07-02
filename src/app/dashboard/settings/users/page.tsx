import {authOptions as config} from "@/utils/AuthOptions";
import Unauthorized from "@/components/dashboard/Unauthorized";
import UserForm from "@/features/users/components/UserForm";
import UsersHeaders from "@/features/users/components/UsersHeader";
import UsersTable from "@/features/users/components/UsersTable";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";

async function UsersPage() {
    const session = await getServerSession(config);
    if (!session) return <Unauthorized />;
    const id = (session?.user as {id: number}).id;
    const result = await validatePermission("@users", id);
    if (!result) return <Unauthorized />;
    const canAdd = await validatePermission("@user-create", id);
    const canEdit = await validatePermission("@user-update", id);
    const canDelete = await validatePermission("@user-delete", id);
    return (
        <div className="flex flex-col w-full h-full">
            <UsersHeaders canAdd={canAdd} />
            <UsersTable canEdit={canEdit} canDelete={canDelete} />
            {canAdd && <UserForm />}
        </div>
    );
}

export default UsersPage;
