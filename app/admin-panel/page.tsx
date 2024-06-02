import getSession from "@/actions/admin/get-session";
import {redirect} from "next/navigation";
import AdminLoginForm from "@/components/admin/admin-login-form";

export default async function Page() {
    const session = await getSession()
    if (session) {
        redirect('/admin-panel/events')
    }

    return (
        <div className="pt-5 lg:pt-48">
            <AdminLoginForm />
        </div>
    )
}