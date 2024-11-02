import axios from "axios";
import {getSession} from "next-auth/react";

const axiosBaseQuery = async ({
    url,
    method,
    data,
    params,
}: {
    url: string;
    method: string;
    data?: any;
    params?: any;
}) => {
    try {
        let token = "";
        try {
            const session = await getSession();
            token = (session?.user as any)?.token;
        } catch (e) {}
        const result = await axios({
            url: "/api/v1/dashboard" + url,
            method,
            data,
            params,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
        return {data: result.data};
    } catch (axiosError) {
        const err = axiosError as any; // Tipo any para manejar el error de axios
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};

export default axiosBaseQuery;
