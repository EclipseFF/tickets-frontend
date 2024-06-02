'use server'

import {cookies} from "next/headers";
import {url} from "@/lib/api";
import { redirect } from 'next/navigation'
import {revalidatePath} from "next/cache";


export default async function logout() {
    await fetch(`${url}/api/v1/user/logout`, {
        method: "DELETE",
        body: JSON.stringify({
            token: cookies().get("session")?.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    cookies().delete("session")
    revalidatePath('/profile')
    redirect('/auth')
}