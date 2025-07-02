import {authOptions as config} from "@/utils/AuthOptions";
import Unauthorized from "@/components/dashboard/Unauthorized";
import CategoriesHeader from "@/features/categories/components/CategoriesHeader";
import CategoriesTable from "@/features/categories/components/CategoriesTable";
import CategoryForm from "@/features/categories/components/CategoryForm";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";

async function CategoriesPage() {
    const session = await getServerSession(config);
    if (!session) return <Unauthorized />;
    const id = (session?.user as {id: number}).id;
    const result = await validatePermission("@categories", id);
    if (!result) return <Unauthorized />;
    const canAdd = await validatePermission("@category-create", id);
    const canEdit = await validatePermission("@category-update", id);
    const canDelete = await validatePermission("@category-delete", id);
    return (
        <div className="flex flex-col w-full h-full">
            <CategoriesHeader canAdd={canAdd} />
            <CategoriesTable canEdit={canEdit} canDelete={canDelete} />
            {canAdd && <CategoryForm />}
        </div>
    );
}

export default CategoriesPage;
