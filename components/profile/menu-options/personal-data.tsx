import {useEffect, useState} from "react";
import getAdditionalData from "@/actions/user/get-additional-data";
import logout from "@/actions/auth/logout";
import {useRouter} from "next/navigation";
import {AdditionalUserData, User} from "@/lib/data";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn, formatDateToRussian} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {Calendar} from "@/components/ui/calendar";

import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import updateUserData from "@/actions/user/update-additional-data";

const formSchema = z.object({
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    surname: z.string(),
    name: z.string(),
    patronymic: z.string(),
    birthday: z.coerce.date().optional(),
})

type Props = {
    user: User
    additionalData: AdditionalUserData
}

export default function PersonalData(props: Props) {
    const router = useRouter()
    const [date, setDate] = useState<Date | undefined>(new Date())

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: props.user.email || "",
            password: "",
            phone: props.user.phone || "",
            name: props.additionalData?.name || "",
            surname: props.additionalData?.surname || "",
            patronymic: props.additionalData?.patronymic || "",
            birthday: props.additionalData?.birthdate || new Date(),
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const data: AdditionalUserData = {
            user_id: props.user.id,
            surname: values.surname,
            name: values.name,
            patronymic: values.patronymic,
            birthdate: values.birthday
        }
        const user: User = {
            id: props.user.id,
            email: values.email,
            phone: values.phone
        }
        updateUserData(data, user, values.password).then((res) => {
            router.refresh()
        })

    }

    return (
        <div className="text-primaryText shadow-lg rounded p-2">
            <p>Персональные данные:</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Электронная почта</FormLabel>
                                <FormControl>
                                    <Input placeholder={props.user.email || "Электронная почта"} type={'email'} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Номер телефона</FormLabel>
                                <FormControl>
                                    <Input placeholder={props.user.phone || "Номер телефона"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Новый пароль</FormLabel>
                                <FormControl>
                                    <Input placeholder={"Новый пароль"} type={'password'} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Фамилия</FormLabel>
                                <FormControl>
                                    <Input placeholder={props.additionalData?.surname || "Фамилия"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                    <Input placeholder={props.additionalData?.name || "Имя"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="patronymic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Отчество</FormLabel>
                                <FormControl>
                                    <Input placeholder={props.additionalData?.patronymic || "Отчество"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Дата рождения: {props.additionalData?.birthdate && formatDateToRussian(props.additionalData?.birthdate.toString())}</FormLabel>
                                <FormControl>
                                    <Input type={'date'} {...field}
                                           value={
                                               field.value instanceof Date
                                                   ? field.value.toISOString().split('T')[0]
                                                   : field.value
                                           }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant={'green'} className="text-white">Сохранить</Button>
                </form>
            </Form>
        </div>
    )
}