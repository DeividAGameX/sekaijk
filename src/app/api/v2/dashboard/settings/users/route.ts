import {authOptions as config} from "@/utils/AuthOptions";
import userValidate from "@/features/users/schemas/user.schema";
import createUser from "@/features/users/service/create.service";
import getAllUsers from "@/features/users/service/getAll.service";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@users", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getAllUsers();
    return NextResponse.json(...response);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@user-create", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = userValidate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    // Crear nuevo usuario
    const newUser = await createUser(body);
    return NextResponse.json(...newUser);
}
