'use server'
import {url} from "@/lib/api";

export default async function getGenres() {
    try {
        const res = await fetch(`${url}/api/v1/event/genres`);
        const data = await res.json();
        return data
    } catch (e) {
        return "error"
    }
}