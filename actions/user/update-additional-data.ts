'use server'

import {AdditionalUserData, User} from "@/lib/data";
import {url} from "@/lib/api";
import {redirect} from "next/navigation";

export default async function updateUserData(data: AdditionalUserData, user: User, password: string) {
    const body = {
        user_id: user.id,
        email: user.email,
        password: password,
        phone: user.phone,
        surname: data.surname,
        name: data.name,
        patronymic: data.patronymic,
        birthdate: data.birthdate?.toISOString(),
    }

    if (data.birthdate?.getDay() === new Date().getDay() && data.birthdate?.getMonth() === new Date().getMonth() && data.birthdate?.getFullYear() === new Date().getFullYear()) {
        body.birthdate = ""
    }
    await fetch(url + '/api/v1/user/additional', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}