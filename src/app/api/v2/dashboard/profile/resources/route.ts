import {authOptions as config} from "@/utils/AuthOptions";
import getResource from "@/features/users/service/resources/getResource.service";
import uploadResource from "@/features/users/service/resources/uploadResource.service";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";
import createFolder from "@/features/users/service/resources/createFolderResource.service";

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
    const author = await getServerSession(config);
    const folder = req.nextUrl.searchParams.get("folder");
    const response = await getResource(
        (author?.user as User).id,
        folder ?? undefined
    );
    return NextResponse.json(...response);
}

export async function POST(req: NextRequest) {
    const {typeForm, ...body} = await req.json();
    const author = await getServerSession(config);
    if (typeForm == "FOLDER") {
        const response = await createFolder({
            name: body.name,
            parentId: body.parentId,
            usersId: (author?.user as User).id,
        });
        return NextResponse.json(...response);
    }
    const response = await uploadResource({
        ...body,
        userId: (author?.user as User).id,
    });
    return NextResponse.json(...response);
}
