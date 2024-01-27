import { url } from "@/utils/config";
import useSWR from "swr";

export default function usePost (endpoint, payload) {
    const fetcher = url => fetch(url, { body: payload }).then(res => res.json());

    const { data, error, isLoading } = useSWR(`${url}${endpoint}`, fetcher);

    return {
        data,
        isLoading,
        isError: error
    }
}