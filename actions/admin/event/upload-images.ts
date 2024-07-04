'use server'

import {url} from "@/lib/api";

export default async function UploadImages(images: FormData) {

    try {
        const res = await fetch(`${url}/api/v1/event/images/upload`, {
            method: 'POST',
            body: images,
        })
        const data = await res.json()
        return data
    } catch (e) {
        console.log(e)
    }
}