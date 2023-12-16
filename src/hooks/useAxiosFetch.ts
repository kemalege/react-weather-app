/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

interface AxiosFetchResult<T> {
    data: T;
    isLoading: boolean;
    error: ErrorResponse | null | unknown;
}
export interface ErrorResponse {
    cod: number;
    message: string;
}

const useAxiosFetch = <T>(dataUrl: string): AxiosFetchResult<T> => {
    const [data, setData] = useState<any>();
    const [error, setError] = useState<ErrorResponse | null | unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;
        const source: CancelTokenSource = axios.CancelToken.source();

        const fetchData = async (url: string) => {
            setIsLoading(true);
            try {
                const response = await axios.get<T>(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        fetchData(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        };

        return cleanUp;
    }, [dataUrl]);

    return { data, error, isLoading };
};

export default useAxiosFetch;
