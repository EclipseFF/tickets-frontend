'use server'

import {url} from "@/lib/api";

export default async function GetVenuesByEvent(id: number) {
    try {
        const res = await fetch(`${url}/api/v1/venue/event/${id}`)
        const data = await res.json()
        console.log(data)
        return data
    } catch (e) {
        return "error"
    }
}