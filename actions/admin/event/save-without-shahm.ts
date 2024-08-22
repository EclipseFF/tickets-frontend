'use server'

import {sellDayProps} from "@/components/admin/create-without-sector";
import {apiUrl, url} from "@/lib/api";

export default async function SaveEventWithoutShahm(venueId: number, eventId: number, days: sellDayProps[]) {
    try {
        const res = await fetch(`${apiUrl}/api/v1/event/tickets/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({venueId, eventId, days})
        })
        const data = await res.json()
        console.log(data)
        return data
    } catch (e) {

    }
}