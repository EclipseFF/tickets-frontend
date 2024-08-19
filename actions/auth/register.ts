'use server'
import {url} from "@/lib/api";
import {cookies} from "next/headers";

interface UserRegister {
    email: string
    password: string
    phone: string
}

export async function register({email, password, phone}: UserRegister) {
    try {
        const res = await fetch(`${url}/api/v1/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password, phone}),
        })
        const data = await res.json()
        switch (data) {
            case "email is used":
                return "email is used"
            case "phone is used":
                return "phone is used"
        }


        cookies().set("session", data.token, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)})
        return "success"
    } catch (e) {
        return "error"
    }
}