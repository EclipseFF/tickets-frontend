'use server'

import {url} from "@/lib/api";
import {News} from "@/lib/data";

export default async function GetLatestNews(): Promise<News> {
    try {
        const res = await fetch(`${url}/api/v1/news/latest`)
        const json = await res.json()

        let n: News = {
            id: json.id,
            name: json.name,
            description: json.description,
            images: json.images,
            created_at: json.created_at
        }

        return n
    } catch (e) {
        return {} as News
    }
}