import deleteFolder from "@/features/users/service/resources/deleteFolder.service";
import {params as ParamsType} from "@/types/api/paramApi";
import {NextRequest, NextResponse} from "next/server";

export async function DELETE(_: NextRequest, {params}: ParamsType) {
    const {id} = await params;
    const response = await deleteFolder(id);
    return NextResponse.json(...response);
}
