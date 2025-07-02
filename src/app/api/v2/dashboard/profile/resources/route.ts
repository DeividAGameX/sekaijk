import {authOptions as config} from "@/utils/AuthOptions";
import getResource from "@/features/users/service/resources/getResource.service";
import uploadResource from "@/features/users/service/resources/uploadResource.service";
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

export async function GET() {
    const author = await getServerSession(config);
    const response = await getResource((author?.user as User).id);
    return NextResponse.json(...response);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const author = await getServerSession(config);
    const response = await uploadResource({
        ...body,
        userId: (author?.user as User).id,
    });
    return NextResponse.json(...response);
}
