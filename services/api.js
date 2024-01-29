import { url } from "@/utils/config";
import axios from "axios";

export async function get (endpoint) {
    const { data, status } = await axios(`${url}${endpoint}`);

    return { data, status };
}

export async function post (endpoint, payload) {
    const { data, status } = await axios.post(`${url}${endpoint}`, payload);

    return { data, status };
}

export async function postFile (endpoint, payload) {
    const response = await fetch(`${url}${endpoint}`, { body: payload, method: "post" });

    const data = await response.json();

    const status = response.status;

    return { data, status };
}