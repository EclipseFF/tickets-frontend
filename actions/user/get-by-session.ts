'use server'

import {url} from "@/lib/api";

export default async function getUserBySession(token: string) {
    try {
        const res = await fetch(`${url}/api/v1/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token}),
        })
        const data = await res.json()
        return data
    } catch (e) {
        return null
    }
}