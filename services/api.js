import { url } from "@/utils/config";

export async function get (endpoint) {
    const response = await fetch(`${url}${endpoint}`);

    const data = await response.json();

    const status = response.status;

    return { data, status };
}

export async function post (endpoint, payload) {
    const response = await fetch(`${url}${endpoint}`, { body: payload, method: "post" });

    const data = await response.json();

    const status = response.status;

    return { data, status };
}