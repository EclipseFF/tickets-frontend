'use server'

import {url} from "@/lib/api";

export default async function GetEventImages(id: number) {
    try {
        const res = await fetch(`${url}/api/v1/event/images/${id}`)
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }
}