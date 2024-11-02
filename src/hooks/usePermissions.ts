import useUserSession from "./useUserSession";

function usePermissions() {
    const {loading, user} = useUserSession();

    const validatePermissions = (allow: string) => {
        const allowed = user?.Roles?.Permissions ?? [];
        if (!allowed.find((a: any) => a.permissions === allow)) {
            return false;
        }
        return true;
    };

    return {validatePermissions, loading};
}

export default usePermissions;
