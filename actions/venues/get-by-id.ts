"use server"

import {url} from "@/lib/api";

export default async function GetVenueById(id: number) {
    try {
        const res = await fetch(`${url}/api/v1/venue/${id}`)
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }
}