import {config} from "@/app/api/auth/[...nextauth]/route";
import {validateCreate} from "@/features/posts/schemas/post.schema";
import createPost from "@/features/posts/service/create.service";
import getAllPost from "@/features/posts/service/getAll.service";
import validatePermission from "@/utils/ValidatePermissions";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    banner?: string | undefined | null;
    slug?: string | undefined | null;
    rolesId: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@posts", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "0");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10");
    const search = req.nextUrl.searchParams.get("search");
    let all: number | null = parseInt(
        req.nextUrl.searchParams.get("all") ?? "0"
    );
    const order = req.nextUrl.searchParams.get("order");
    const allAllowed = await validatePermission("@posts-all", id);
    if (allAllowed) {
        console.log("Puede ver todos los posts");
    } else {
        all = id;
    }
    const response = await getAllPost(
        page,
        limit,
        search,
        all,
        order
            ? {
                  [order.split(":")[0]]: order.split(":")[1],
              }
            : {
                  createdAt: "desc",
              }
    );
    return NextResponse.json(...response);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(config);
    if (!session)
        return NextResponse.json({message: "not-allow"}, {status: 401});
    const id = (session?.user as {id: number}).id;
    const allowed = await validatePermission("@post-create", id);
    if (!allowed)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const body = await req.json();
    const isValid = validateCreate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    const author = await getServerSession(config);
    const response = await createPost(body, (author?.user as User).id);
    return NextResponse.json(...response);
}
