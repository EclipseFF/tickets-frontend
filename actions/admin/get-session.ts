'use server'

import {cookies} from "next/headers";

export default async function getSession() {
    return cookies().get('accessToken')?.value
}