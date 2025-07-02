import {authOptions as config} from "@/utils/AuthOptions";
import roleValidate from "@/features/roles/schemas/role.schema";
import deleteRol from "@/features/roles/service/delete.service";
import editRol from "@/features/roles/service/edit.service";
import getRol from "@/features/roles/service/getOne.service";
import {params} from "@/types/api/paramApi";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET(_: NextRequest, {params}: params) {
    const {id: idRol} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@role", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getRol(parseInt(idRol));
    return NextResponse.json(...response);
}

export async function PUT(req: NextRequest, {params}: params) {
    const {id: idRol} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@role-update", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = roleValidate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    console.log(parseInt(idRol));
    const response = await editRol(parseInt(idRol), body);
    return NextResponse.json(...response);
}

export async function DELETE(_: NextRequest, {params}: params) {
    const {id: idRol} = await params;
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@role-delete", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await deleteRol(parseInt(idRol));
    return NextResponse.json(...response);
}
