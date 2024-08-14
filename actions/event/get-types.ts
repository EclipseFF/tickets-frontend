'use server'

import {url} from "@/lib/api";
import {EventType} from "@/lib/data";

export default async function getEventTypes(): Promise<EventType[]> {
    try {
        const response = await fetch(`${url}/api/v1/type/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store"
        })
        const json = await response.json()
        let types: EventType[] = []
        if (Array.isArray(json)) {
            json.forEach((t: any) => {
                const temp: EventType = {
                    id: t.id,
                    name: t.name,
                    translatedName: t.translatedName
                }
                types.push(temp)
            })
        }

        return types
    } catch (error) {
        return []
    }
}