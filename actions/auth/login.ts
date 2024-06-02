'use server'

import {url} from "@/lib/api";
import {cookies} from "next/headers";

export async function login(email: string, password: string) {
    try {
        const res = await fetch(`${url}/api/v1/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        })
        const data = await res.json()
        switch (data) {
            case "user not found":
                return "user not found"
            case "unauthorized":
                return "unauthorized"
            case "internal server error":
                return "error"
        }
        console.log(data)
        cookies().set("session", data.token, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)})
        return "success"
    } catch (e) {
        return "error"
    }
}