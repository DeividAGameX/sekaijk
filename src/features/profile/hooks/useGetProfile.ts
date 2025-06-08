import {useGetProfileQuery} from "../lib/Profile.reducer";
import {Profile} from "../types/profile";

function useGetProfile(initialData?: Profile) {
    const result = useGetProfileQuery({});
    return {
        ...result,
        data: result.data ?? initialData,
    };
}

export default useGetProfile;
