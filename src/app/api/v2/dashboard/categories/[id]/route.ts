import {params} from "@/types/api/paramApi";
import {NextRequest, NextResponse} from "next/server";
import editCategories from "@/features/categories/service/edit.service";
import categoryValidate from "@/features/categories/schemas/category.schema";
import deleteCategories from "@/features/categories/service/delete.service";
import getElementById from "@/features/categories/service/getOne.service";
import {getServerSession} from "next-auth";
import {config} from "@/app/api/auth/[...nextauth]/route";
import validatePermission from "@/utils/ValidatePermissions";

export async function GET(_: NextRequest, {params}: params) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@category", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getElementById(parseInt(params.id));
    return NextResponse.json(...response);
}

export async function PUT(req: NextRequest, {params}: params) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@category-update", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = categoryValidate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    const response = await editCategories(parseInt(params.id), body);
    return NextResponse.json(...response);
}

export async function DELETE(_: NextRequest, {params}: params) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@category-delete", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await deleteCategories(parseInt(params.id));
    return NextResponse.json(...response);
}
