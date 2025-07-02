import {authOptions as config} from "@/utils/AuthOptions";
import getNotifications from "@/features/notifications/service/getNotifications.service";
import markReadNotification from "@/features/notifications/service/markReadNotification.service";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const author = await getServerSession(config);
    if (!author)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await getNotifications((author.user as {id: number}).id);
    return NextResponse.json(...response);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const author = await getServerSession(config);
    if (!author)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await markReadNotification(
        (author.user as {id: number}).id,
        body
    );
    return NextResponse.json(...response);
}
