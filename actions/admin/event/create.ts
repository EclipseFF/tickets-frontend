'use server'

import {url} from "@/lib/api";
import {EventReq} from "@/lib/data";
import {JSONContent} from "@tiptap/core";

export default async function createEvent(event: EventReq, description?: JSONContent) {
    try {
        event.description = description
        console.log(event.briefDesc)
        const res = await fetch(`${url}/api/v1/event/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }
}