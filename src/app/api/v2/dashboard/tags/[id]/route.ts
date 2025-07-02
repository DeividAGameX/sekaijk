import {authOptions as config} from "@/utils/AuthOptions";
import tagValidate from "@/features/tags/schemas/tag.schema";
import deleteTag from "@/features/tags/service/delete.service";
import editTag from "@/features/tags/service/edit.service";
import getTag from "@/features/tags/service/getOne.service";
import {params} from "@/types/api/paramApi";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET(_: NextRequest, {params}: params) {
    const {id: idTag} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@tag", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getTag(parseInt(idTag));
    return NextResponse.json(...response);
}

export async function PUT(req: NextRequest, {params}: params) {
    const {id: idTag} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@tag-update", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = tagValidate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    const response = await editTag(parseInt(idTag), body);
    return NextResponse.json(...response);
}

export async function DELETE(_: NextRequest, {params}: params) {
    const {id: idTag} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@tag-delete", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await deleteTag(parseInt(idTag));
    return NextResponse.json(...response);
}
