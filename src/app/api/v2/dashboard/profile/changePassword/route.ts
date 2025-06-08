import {config} from "@/app/api/auth/[...nextauth]/route";
import changePassword from "@/features/profile/service/changePassword.service";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

interface User {
    id: number;
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const author = await getServerSession(config);
    const response = await changePassword((author?.user as User).id, body);
    return NextResponse.json(...response);
}
