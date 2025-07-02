import {authOptions as config} from "@/utils/AuthOptions";
import categoryValidate from "@/features/categories/schemas/category.schema";
import createCategories from "@/features/categories/service/create.service";
import getAllCategories from "@/features/categories/service/getAll.service";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@categories", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getAllCategories();
    return NextResponse.json(...response);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@category-create", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = categoryValidate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    console.log("Creando");
    const response = await createCategories(body);
    return NextResponse.json(...response);
}
