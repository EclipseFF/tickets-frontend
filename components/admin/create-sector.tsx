// components/AddSectorForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


const schema = z.object({
    venueId: z.string().min(1, { message: "Required" }),
    name: z.string().min(1, { message: "Required" }),
    layout: z.string().min(1, { message: "Required" }),
});

type FormValues = z.infer<typeof schema>;




export default function CreateSector(){
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });


    // 1. Define your form.
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            venueId: "1",
            name: "New Sector",
            layout: "{}",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof schema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        /*        const res = await fetch('/api/sectors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                if (res.ok) {
                    // Обработка успешного создания сектора
                }*/
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                    control={form.control}
                    name="venueId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Id</FormLabel>
                            <FormControl>
                                <Input placeholder="id" {...field} />
                            </FormControl>
                            <FormDescription>
                                Form id
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormDescription>
                                Form name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="layout"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Layout</FormLabel>
                            <FormControl>
                                <Input placeholder="layout" {...field} />
                            </FormControl>
                            <FormDescription>
                                Form layout
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

