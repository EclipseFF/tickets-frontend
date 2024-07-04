'use server'

import {sellDayProps} from "@/components/admin/create-without-sector";
import {url} from "@/lib/api";

export default async function SaveEventWithoutShahm(venueId: number, eventId: number, days: sellDayProps[]) {
    try {
        const res = await fetch(`${url}/api/v1/admin/event/save-without-shahm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({venueId, eventId, days}),
        });
        const data = await res.json();
        return data;
    } catch (e) {
        return "error";
    }
}