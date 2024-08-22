import GetLatestNews from "@/actions/news/get-latest";
import GetPaginatedNews from "@/actions/news/get-pagination";
import {Button} from "@/components/ui/button";
import Navbar from "@/components/admin/navbar";
import Link from "next/link";
import NewsList from "@/components/admin/news-list";

export default async function Page() {

    return(
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 p-6">Админ панель</h1>
            <div className="grid grid-cols-10 gap-4 p-6">
                <div className="col-span-2">
                    <Navbar />
                </div>
                <div className="col-span-8 bg-white shadow-lg rounded-lg p-6">
                    <Link href={'/admin-panel/news/create'}>
                        <Button variant="green" className="m-4">
                            Создать новость
                        </Button>
                    </Link>

                    <NewsList />
                </div>
            </div>
        </div>
    )
}