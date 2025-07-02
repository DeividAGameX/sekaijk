import axios, {AxiosError} from "axios";

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
        const result = await axios({
            url: "/api/v2/" + url,
            method,
            data,
            params,
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
