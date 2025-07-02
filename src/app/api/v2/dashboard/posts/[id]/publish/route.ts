import {authOptions as config} from "@/utils/AuthOptions";
import {validatePublish} from "@/features/posts/schemas/post.schema";
import publishPost, {
    validateTempPublish,
} from "@/features/posts/service/publish.service";
import {params} from "@/types/api/paramApi";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest, {params}: params) {
    const {id: idPost} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@post-review", id);
    const validPublish = await validateTempPublish(parseInt(idPost), id);
    if (validPublish) {
        if (!allowed)
            return NextResponse.json({message: "not-allow"}, {status: 403});
    }
    const body = await req.json();
    const isValid = validatePublish(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    const response = await publishPost(parseInt(idPost), {
        ...body,
        editorId: id,
    });
    return NextResponse.json(...response);
}
