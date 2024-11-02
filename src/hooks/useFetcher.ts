import axios from "axios";
import {DependencyList, useEffect, useState} from "react";

/** */
function useFetcher<TYPE>(url: string, deps: DependencyList) {
    const [data, setData] = useState<TYPE>();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        axios
            .get(url, {
                signal: controller.signal,
            })
            .then((response) => setData(response.data))
            .catch((error) => {
                if (error.name) {
                    if (error.name !== "CanceledError") {
                        setError(error);
                    }
                }
            })
            .finally(() => setLoading(false));
        return () => controller.abort();
    }, deps);

    return {data, error, loading};
}

export default useFetcher;
