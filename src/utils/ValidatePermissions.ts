import PermissionsModel from "@/features/roles/lib/PermissionsModel";
import UsersModel from "@/features/users/lib/UsersModel";

export default async function validatePermission(
    permission: string,
    userId: number
): Promise<boolean> {
    const user = await UsersModel.findUnique({
        select: {
            rolesId: true,
        },
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const existingPermission = await PermissionsModel.findFirst({
        where: {
            roleId: user.rolesId,
            permission: permission,
        },
    });
    return existingPermission ? true : false;
}
