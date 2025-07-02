import {authOptions as config} from "@/utils/AuthOptions";
import {validateCreate} from "@/features/posts/schemas/post.schema";
import deleteUser from "@/features/users/service/delete.service";
import editUser from "@/features/users/service/edit.service";
import getUser from "@/features/users/service/getOne.service";
import {params} from "@/types/api/paramApi";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET(_: NextRequest, {params}: params) {
    const {id: idUser} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@user", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getUser(parseInt(idUser));
    return NextResponse.json(...response);
}

export async function PUT(req: NextRequest, {params}: params) {
    const {id: idUser} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@user-update", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = await validateCreate(body);
    if (isValid[1].status == 404) {
        return NextResponse.json(...isValid);
    }
    const response = await editUser(parseInt(idUser), body);
    return NextResponse.json(...response);
}

export async function DELETE(_: NextRequest, {params}: params) {
    const {id: idUser} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@user-delete", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await deleteUser(parseInt(idUser));
    return NextResponse.json(...response);
}
