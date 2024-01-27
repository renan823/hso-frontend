import { url } from "@/utils/config";
import useSWR from "swr";

export default function useGet (endpoint) {
    const fetcher = url => fetch(url).then(res => res.json());

    const { data, error, isLoading } = useSWR(`${url}${endpoint}`, fetcher);

    return {
        data,
        isLoading,
        isError: error
    }
}