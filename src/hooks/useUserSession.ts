import {useSession} from "next-auth/react";
import {useCallback, useEffect, useState} from "react";

interface UserProvider {
    id: number;
    name: string;
    email: string;
    avatar: string;
    banner?: string | undefined | null;
    slug?: string | undefined | null;
    rolesId: number;
    createdAt: string;
    updatedAt: string;
    Roles: {
        id: number;
        name: string;
        description: string;
        Permissions: {permission: string}[];
    };
}

function useUserSession() {
    const [user, setUser] = useState<UserProvider | null>();
    const [loading, setLoading] = useState(true);
    const {data, status} = useSession();
    // const validatePermission = (
    //     permission: string,
    //     up: UserProvider | null | undefined
    // ) => {
    //     if (!up) return false;
    //     console.log(up.Role.Permissions);
    //     const userPermissions = up.Role.Permissions.map((p) => p.permission);
    //     return userPermissions.some((p) => p === permission);
    // };

    const validatePermission = useCallback(
        (permission: string) => {
            console.log(user);
            if (!user) return false;
            console.log(user.Roles.Permissions);
            const userPermissions = user.Roles.Permissions.map(
                (p) => p.permission
            );
            return userPermissions.some((p) => p === permission);
        },
        [user]
    );

    useEffect(() => {
        if (status !== "loading") {
            if (status === "authenticated") {
                setLoading(false);
                setUser(data.user as UserProvider);
            } else {
                setLoading(true);
                setUser(null);
            }
        }
    }, [data, status]);

    return {
        user,
        loading,
        validatePermission,
    };
}

export default useUserSession;
