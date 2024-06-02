'use server'

import {url} from "@/lib/api";

export default async function getAdmin(token: string) {
    try {
        const res = await fetch(`${url}/api/v1/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        })
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }
}