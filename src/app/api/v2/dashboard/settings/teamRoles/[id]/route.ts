import {config} from "@/app/api/auth/[...nextauth]/route";
import teamRoleValidate from "@/features/teamRole/schemas/teamRole.schema";
import deleteTeamRole from "@/features/teamRole/service/delete.service";
import editTeamRole from "@/features/teamRole/service/edit.service";
import getTeamRole from "@/features/teamRole/service/getOne.service";
import {params} from "@/types/api/paramApi";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET(_: NextRequest, {params}: params) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@team-role", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getTeamRole(parseInt(params.id));
    return NextResponse.json(...response);
}

export async function PUT(req: NextRequest, {params}: params) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@team-role-update", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = teamRoleValidate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    const response = await editTeamRole(parseInt(params.id), body);
    return NextResponse.json(...response);
}

export async function DELETE(_: NextRequest, {params}: params) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@team-role-delete", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await deleteTeamRole(parseInt(params.id));
    return NextResponse.json(...response);
}
