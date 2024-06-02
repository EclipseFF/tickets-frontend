'use client'
import ProfileMenu from "@/components/profile/profile-menu";
import Tickets from "@/components/profile/menu-options/tickets";
import {useSearchParams} from "next/navigation";
import PersonalData from "@/components/profile/menu-options/personal-data";
import BankCards from "@/components/profile/menu-options/bank-cards";
import TicketsReturn from "@/components/profile/menu-options/tickets-return";
import Support from "@/components/profile/menu-options/support";
import QAndA from "@/components/profile/menu-options/q-and-a";
import Offer from "@/components/profile/menu-options/offer";
import {useEffect, useState} from "react";
import getSession from "@/actions/auth/session";
import getUserBySession from "@/actions/user/get-by-session";
import logout from "@/actions/auth/logout";
import getAdditionalData from "@/actions/user/get-additional-data";
import {AdditionalUserData, User} from "@/lib/data";

export default function Profile() {
    const searchParams = useSearchParams()
    const option = searchParams.get('option') || 'data'
    const [user, setUser] = useState<User>({} as User)
    const [additionalData, setAdditionalData] = useState<AdditionalUserData>()
    useEffect(() => {
        getSession().then(session => {
            if (session) {
                getUserBySession(session).then(u => {
                    if (u) {
                        setUser(u)
                        getAdditionalData(u.id).then(data => {
                            setAdditionalData(data)
                        })
                    } else {
                        logout()
                    }
                })
            }
        })
    }, [])
    return (
        <div className="grid grid-cols-10 ">
            <div className="col-span-3">
                <ProfileMenu option={option} name={additionalData?.name} surname={additionalData?.surname}/>
            </div>
            <div className="col-span-7">
                {option === 'tickets' && <Tickets/>}
                {option === 'data' && <PersonalData id={user.id}/>}
                {option === 'cards' && <BankCards/>}
                {option === 'return' && <TicketsReturn/>}
                {option === 'support' && <Support/>}
                {option === 'qa' && <QAndA/>}
                {option === 'offer' && <Offer/>}
            </div>
        </div>
    )
}