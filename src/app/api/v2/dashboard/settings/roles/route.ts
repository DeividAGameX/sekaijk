import {config} from "@/app/api/auth/[...nextauth]/route";
import roleValidate from "@/features/roles/schemas/role.schema";
import createRol from "@/features/roles/service/create.service";
import getAllRoles from "@/features/roles/service/getAll.service";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@roles", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getAllRoles();
    return NextResponse.json(...response);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@role-create", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = roleValidate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    const response = await createRol(body);
    return NextResponse.json(...response);
}
