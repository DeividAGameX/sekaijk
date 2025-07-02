import {authOptions as config} from "@/utils/AuthOptions";
import {validateUpdate} from "@/features/posts/schemas/post.schema";
import getPost from "@/features/posts/service/getOne.service";
import updatePost from "@/features/posts/service/update.service";
import {params} from "@/types/api/paramApi";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, {params}: params) {
    const {id: idPost} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@post", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getPost(parseInt(idPost));
    return NextResponse.json(...response);
}

export async function PUT(req: NextRequest, {params}: params) {
    const {id: idPost} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@post-update", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = validateUpdate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    const response = await updatePost(parseInt(idPost), body);
    return NextResponse.json(...response);
}
