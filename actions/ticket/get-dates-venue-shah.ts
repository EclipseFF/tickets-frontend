'use server'

import {url} from "@/lib/api";
import {EventDay} from "@/lib/data";
import {Seat} from "@/components/admin/shahmatka";

export default async function GetDatesVenueShah(venueId?: number, eventId?: number) {
    try {
        const res = await fetch(`${url}/api/v1/ticket/venue/dates-shah`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({eventId: eventId, venueId:venueId})
        })
        const data = await res.json()
        let dates: Seat[] = []
        data.forEach((day: Seat) => {
            const t: Seat = {
                id: day.id,
                num: day.num,
                left: day.left,
                top: day.top,
                price: day.price,
                bgColor: day.bgColor,
                textColor: day.textColor,
                date: day.date && new Date(day.date)
            }
            dates.push(t)
        })
        console.log(dates)
        return dates
    } catch (e) {
        return []
    }
}