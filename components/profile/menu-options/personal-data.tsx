import {useEffect, useState} from "react";
import getAdditionalData from "@/actions/user/get-additional-data";
import logout from "@/actions/auth/logout";
import {useRouter} from "next/navigation";
import {AdditionalUserData} from "@/lib/data";

type Props = {
    id: number
}

export default function PersonalData({id}: Props) {
    const router = useRouter()
    const [additionalData, setAdditionalData] = useState<AdditionalUserData>()

    useEffect(() => {
        getAdditionalData(id).then(data => {
            setAdditionalData(data)
            console.log(additionalData)
        })
    }, [id])
    return (
        <div>
            <p>Персональные данные {id}</p>
            <p>Имя: {additionalData?.name}</p>
            <p>Фамилия: {additionalData?.surname}</p>
            <p>Отчество: {additionalData?.patronymic}</p>
        </div>
    )
}