import {authOptions as config} from "@/utils/AuthOptions";
import Unauthorized from "@/components/dashboard/Unauthorized";
import PostCreate from "@/features/posts/components/Posts/PostCreate";
import PostsHeader from "@/features/posts/components/Posts/PostsHeader";
import PostList from "@/features/posts/components/Posts/PostsList";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";

async function PostPage() {
    const session = await getServerSession(config);
    if (!session) return <Unauthorized />;
    const id = (session?.user as {id: number}).id;
    const result = await validatePermission("@posts", id);
    if (!result) return <Unauthorized />;
    const viewAll = await validatePermission("@posts-all", id);
    const canAdd = await validatePermission("@post-create", id);
    const canEdit = await validatePermission("@post-update", id);
    const canReview = await validatePermission("@post-publish", id);
    const canDelete = await validatePermission("@post-delete", id);
    return (
        <div className="flex flex-col w-full h-full">
            <PostsHeader canAdd={canAdd} viewAll={viewAll} />
            <PostList
                canEdit={canEdit}
                canReview={canReview}
                canDelete={canDelete}
            />
            {canAdd && <PostCreate />}
        </div>
    );
}

export default PostPage;
