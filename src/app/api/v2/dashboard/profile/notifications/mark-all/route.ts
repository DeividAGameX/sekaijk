import {authOptions as config} from "@/utils/AuthOptions";
import markReadNotifications from "@/features/notifications/service/markReadNotifications.service";
import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";

export async function POST() {
    const author = await getServerSession(config);
    if (!author)
        return NextResponse.json({message: "not-allow"}, {status: 403});
    const response = await markReadNotifications(
        (author.user as {id: number}).id
    );
    return NextResponse.json(...response);
}
