'use server'

import {url} from "@/lib/api";

export default async function getEventByTypePage(type?: string, page?: number) {
    try {
        const response = await fetch(`${url}/api/v1/event/type/${type}?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        return "error"
    }
}