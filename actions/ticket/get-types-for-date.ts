'use server'

import {url} from "@/lib/api";

export default async function GetTicketTypesForDateNoShah() {

    try {
        const res = await fetch(`${url}/api/v1/ticket/types`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }
}