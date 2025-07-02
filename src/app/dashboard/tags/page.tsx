import TagsHeader from "@/features/tags/components/TagsHeader";
import TagsTable from "@/features/tags/components/TagsTable";
import TagForm from "@/features/tags/components/TagForm";
import {getServerSession} from "next-auth";
import {authOptions as config} from "@/utils/AuthOptions";
import validatePermission from "@/utils/ValidatePermissions";
import Unauthorized from "@/components/dashboard/Unauthorized";

async function TagPage() {
    const session = await getServerSession(config);
    if (!session) return <Unauthorized />;
    const id = (session?.user as {id: number}).id;
    const result = await validatePermission("@tags", id);
    if (!result) return <Unauthorized />;
    const canAdd = await validatePermission("@tag-create", id);
    const canEdit = await validatePermission("@tag-update", id);
    const canDelete = await validatePermission("@tag-delete", id);
    return (
        <div className="flex flex-col w-full h-full">
            <TagsHeader canAdd={canAdd} />
            <TagsTable canEdit={canEdit} canDelete={canDelete} />
            {canEdit && <TagForm />}
        </div>
    );
}

export default TagPage;
