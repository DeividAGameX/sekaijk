import {authOptions as config} from "@/utils/AuthOptions";
import changePassword from "@/features/profile/service/changePassword.service";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

interface User {
    id: number;
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const author = await getServerSession(config);
    if (!author)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await changePassword((author.user as User).id, body);
    return NextResponse.json(...response);
}
