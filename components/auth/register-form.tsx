import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {register} from "@/actions/auth/register";
import {useRouter} from "next/navigation";
import {red} from "next/dist/lib/picocolors";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().min(2, {message: "Введите крректную почту"}),
    password: z.string().min(2, {message: "Введите крректный пароль"}),
    checkPassword: z.string().min(2, {message: "Пароли не одинаковы"}),
    phone: z.string().min(2, {message: "Введите крректный телефон"}),
})

export default function RegisterForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            phone: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.password !== values.checkPassword) {
            form.setError("checkPassword", {message: "Пароли не одинаковы"})
        }

        const res = register(values)
        res.then((data) => {
            if (data === "email is used") {
                form.setError("email", {message: "Пользователь с такой почтой уже существует"})
            }
            if (data === "phone is used") {
                form.setError("phone", {message: "Пользователь с таким телефоном уже существует"})
            }
            if (data === "success") {
                router.push('/')
            }
        })
    }

    return (
        <div className="">
            <div className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Почта" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Пароль" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="checkPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Подтвердите пароль" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="+7" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Зарегестрироваться</Button>
                        <div>
                            <p>Нажимая &ldquo;Зарегестрироваться&rdquo;, вы соглашаетесть с <Link className="font-semibold underline" href={'/conf'}>договором конфиденциальности</Link></p>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}