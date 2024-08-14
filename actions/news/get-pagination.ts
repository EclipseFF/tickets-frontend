'use server'

import { url } from "@/lib/api";
import { News } from "@/lib/data";

export default async function GetPaginatedNews(page: number): Promise<News[]> {
    try {
        const res = await fetch(`${url}/api/v1/news/page?page=${page}`);
        const json = await res.json();


        let news: News[] = [];

        if (Array.isArray(json.news)) {
            json.news.forEach((n: any) => {
                const temp: News = {
                    id: n.id,
                    name: n.name,
                    description: n.description,
                    images: n.images || [], // Default to an empty array if images are null
                    created_at: new Date(n.created_at) // Ensure correct date formatting
                };
                news.push(temp);
            });

        }

        return news;
    } catch (e) {
        return [] as News[];
    }
}