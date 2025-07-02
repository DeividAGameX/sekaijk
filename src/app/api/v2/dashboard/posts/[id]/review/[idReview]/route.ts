import {authOptions as config} from "@/utils/AuthOptions";
import {changeStateReview} from "@/features/posts/service/review.service";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function POST(
    req: NextRequest,
    {params}: {params: Promise<{idReview: string}>}
) {
    const {idReview} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@post-review", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const response = await changeStateReview(idReview, {
        ...body,
        editorId: id,
    });
    return NextResponse.json(...response);
}
