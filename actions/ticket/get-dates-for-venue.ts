'use server'

import {url} from "@/lib/api";
import {EventDay} from "@/lib/data";

export default async function GetDatesForVenueNoShah(venueId?: number, eventId?: number):Promise<EventDay[]> {
    try {
        const res = await fetch(`${url}/api/v1/ticket/venue/dates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({eventId: eventId, venueId:venueId})
        })
        const data = await res.json()
        let dates: EventDay[] = []
        data.forEach((day: EventDay) => {
            const t: EventDay = {
                id: day.id,
                event_id: day.event_id,
                date: day.date,
                types: day.types
            }
            dates.push(t)
        })

        return dates
    } catch (e) {
        return []
    }
}