'use server'

import {url} from "@/lib/api";
import {cookies} from "next/headers";

export default async function BuyTickets(token: string, venueId?: number, eventId?: number, typeId?: number, count?: number) {
    try {
        const res = await fetch(`${url}/api/v1/ticket/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userToken: token,
                ticketTypeId: typeId,
                count: count
            })
        })
        const data = await res.json()
        console.log(data)
        return data
    } catch (e) {
        console.log(e)
        return "error"
    }
}