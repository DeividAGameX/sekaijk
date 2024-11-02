import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

function useUserSession() {
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);
    const {data, status} = useSession();

    useEffect(() => {
        if (status !== "loading") {
            if (status === "authenticated") {
                setLoading(false);
                setUser(data.user);
            } else {
                setLoading(true);
                setUser(null);
            }
        }
    }, [data, status]);

    return {
        user,
        loading,
    };
}

export default useUserSession;
