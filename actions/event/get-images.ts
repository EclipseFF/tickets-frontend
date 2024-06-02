'use server'

import {url} from "@/lib/api";

export default async function getEventImages(event_id: number) {
    try {
        const res = await fetch(`${url}/api/v1/event/images/${event_id}`)
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }
}