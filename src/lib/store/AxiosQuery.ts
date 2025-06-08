import {ExtendedSession} from "@/app/api/auth/[...nextauth]/route";
import axios, {AxiosError} from "axios";
import {getSession} from "next-auth/react";

const AxiosBaseQuery = async <T, P>({
    url,
    method,
    data,
    params,
}: {
    url: string;
    method: string;
    data?: T;
    params?: P;
}) => {
    try {
        let token = "";
        try {
            const session = await getSession();
            token =
                (((session as ExtendedSession)?.user).token as string) ?? "";
        } catch (e) {
            console.log(e);
        }
        const result = await axios({
            url: "/api/v2/dashboard" + url,
            method,
            data,
            params,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
        return {data: result.data};
    } catch (axiosError) {
        const err = axiosError as AxiosError; // Tipo any para manejar el error de axios
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};

export default AxiosBaseQuery;
