'use client'

import LoginForm from "@/components/auth/login-form";
import {useState} from "react";
import RegisterForm from "@/components/auth/register-form";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import Link from "next/link";

export default function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true)
    return(
        <div className="pt-5 lg:pt-48 lg:w-72">
            <h1 className="font-extrabold text-xl">Вход/Регистрация</h1>
            <div className="flex pt-2 lg:pt-5 pb-1 lg:pb-5">
                <button onClick={() => setIsLogin(true)} className={clsx("font-normal text-base p-2",isLogin && "border-b-2 border-primaryGreen font-semibold")}>Вход</button>
                <button onClick={() => setIsLogin(false)} className={clsx("font-normal text-base p-2",!isLogin && "border-b-2 border-primaryGreen font-semibold")}>Регистрация</button>
            </div>
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <Link href={'/'}>
                <p className="text-primaryGreen font-semibold text-lg pt-3">
                    На главную
                </p>
            </Link>
        </div>
    )
}