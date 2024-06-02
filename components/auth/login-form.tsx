import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {login} from "@/actions/admin/login";
import {register} from "@/actions/auth/register";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    email: z.string().min(2, { message: "Введите крректную почту" }),
    password: z.string().min(2, { message: "Введите крректный пароль" }),
})

export default function LoginForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const res = login(values.email, values.password)

        res.then((data) => {
            if (data === "user not found") {
                form.setError("email", {message: "Пользователь не найден"})
            }
            if (data === "unauthorized") {
                form.setError("password", {message: "Неверный пароль"})
            }
            if (data === "error") {
                form.setError("password", {message: "Произошла ошибка"})
            }
            if (data === "success") {
                router.push('/')
            }
        })
    }

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Почта" {...field} />
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

                                <FormControl>
                                    <Input placeholder="Пароль" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Войти</Button>
                </form>
            </Form>
        </div>
    )
}