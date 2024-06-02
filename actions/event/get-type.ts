'use server'

import {url} from "@/lib/api";

export default async function getEventType(name: string) {
    try {
        const response = await fetch(`${url}/api/v1/type/${name}`, {
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