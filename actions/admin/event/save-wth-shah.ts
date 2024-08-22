'use server'

import {Seat} from "@/components/admin/shahmatka";
import {apiUrl} from "@/lib/api";

export default async function SaveWthShah(venueId: number, eventId: number, seat: Seat[][]) {
    console.log(seat)
    try {
        const res = await fetch(`${apiUrl}/api/v1/event/tickets-shah/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({venueId: venueId, eventId: eventId, seats: seat})
        })
        const data = await res.json()
        return data
    } catch (e) {
        console.log(e)
    }
}