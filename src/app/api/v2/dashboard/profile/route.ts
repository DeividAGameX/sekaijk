import {authOptions as config} from "@/utils/AuthOptions";
import profileValidate from "@/features/profile/schemas/profile.schema";
import getProfile from "@/features/profile/service/getProfile.service";
import updateProfile from "@/features/profile/service/updateData.service";
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
    const response = await getProfile((author?.user as User).id);
    return NextResponse.json(...response);
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const isValid = profileValidate(body);
    if (isValid[1].status == 400) {
        return NextResponse.json(...isValid);
    }
    const author = await getServerSession(config);
    const response = await updateProfile((author?.user as User).id, body);
    return NextResponse.json(...response);
}
