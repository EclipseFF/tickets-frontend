'use server'
import {url} from "@/lib/api";

export default async function getAdditionalData(id: number) {
    try {
        const res = await fetch(`${url}/api/v1/user/additional/${id}`)
        const data = await res.json()
        return data
    } catch (e) {
        return "error"
    }
}