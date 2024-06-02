'use server'

import {url} from "@/lib/api";

export default async function getVenues() {
    try {
        const res = await fetch(`${url}/api/v1/venue/all`)
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }

}