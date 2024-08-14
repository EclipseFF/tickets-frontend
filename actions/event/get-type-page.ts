'use server'

import {url} from "@/lib/api";
import {EventInterface} from "@/lib/data";

export default async function getEventByTypePage(type?: string, page?: number): Promise<EventInterface[]> {
    try {
        const response = await fetch(`${url}/api/v1/event/type/${type}?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store"
        })
        const json = await response.json()


        let events: EventInterface[] = []
        if (Array.isArray(json)) {
            json.forEach((e: any) => {
                const temp: EventInterface = {
                    id: e.id,
                    title: e.title,
                    eventType: e.eventType,
                    description: e.description,
                    briefDesc: e.briefDesc,
                    genres: e.genres,
                    venues: e.venues,
                    startTime: new Date(e.startTime),
                    endTime: new Date(e.endTime),
                    price: e.price,
                    ageRestriction: e.ageRestriction,
                    rating: e.rating,
                    createdAt: new Date(e.createdAt),
                    updatedAt: new Date(e.updatedAt),
                    duration: e.duration
                }

                events.push(temp)
            })


        }

        return events
    } catch (error) {
        return []
    }
}