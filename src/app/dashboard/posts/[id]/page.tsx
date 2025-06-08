import {config} from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/components/dashboard/Unauthorized";
import MainFormPost from "@/features/posts/components/PostEditor/MainForm";
import PostModel from "@/features/posts/lib/PostModel";
import {compileMarkdownToHtml} from "@/utils/MarkdownToHtml";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";

type props = {
    params: Promise<{id: string}>;
};

async function PageEditor({params}: props) {
    const session = await getServerSession(config);
    if (!session) return <Unauthorized />;
    const idUser = (session?.user as {id: number}).id;
    const result = await validatePermission("@post", idUser);
    if (!result) return <Unauthorized />;
    const {id} = await params;
    const post = await PostModel.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            Tags: true,
        },
    });
    if (!post) {
        return <div>Post not found</div>;
    }
    // console.log(post.body);
    post.body = compileMarkdownToHtml(post.body ?? "");
    // post.body = post.body;
    return <MainFormPost {...post} />;
}

export default PageEditor;
