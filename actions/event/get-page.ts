'use server'

import {url} from "@/lib/api";

export default async function getEventsPage(page: number) {
    try {
        const res = await fetch(`${url}/api/v1/event/page?page=${page}`)
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }
}