'use server'

import {url} from "@/lib/api";

export default async function getEventById(id: number) {
    try {
        const res = await fetch(`${url}/api/v1/event/${id}`)
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }
}