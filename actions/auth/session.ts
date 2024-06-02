'use server'
import {cookies} from "next/headers";

export default async function getSession() {
    const token = cookies().get("session")
    if (token && token.value !== "") {
        return token.value
    } else {
        return null
    }
}