import Navbar from "@/components/admin/navbar";
import EventsList from "@/components/admin/events-list";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import getSession from "@/actions/admin/get-session";
import {redirect} from "next/navigation";

export default async function Page() {

    const session = await getSession()
    if (!session) {
        redirect('/admin-panel')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 p-6">Админ панель</h1>
            <div className="grid grid-cols-10 gap-4 p-6">
                <div className="col-span-2">
                    <Navbar />
                </div>
                <div className="col-span-8 bg-white shadow-lg rounded-lg p-6">
                    <Link href={'/admin-panel/events/create'}>
                        <Button variant="green" className="m-4">
                            Создать новое событие
                        </Button>
                    </Link>
                    <EventsList />
                </div>
            </div>
        </div>
    );
}