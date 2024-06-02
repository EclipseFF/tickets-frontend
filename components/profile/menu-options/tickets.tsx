import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ActiveTickets from "@/components/profile/menu-options/active-tickets";
import TicketsHistory from "@/components/profile/menu-options/tickets-history";

export default function Tickets() {
    return (
        <div className="rounded-xl shadow">
            <div className="flex justify-between p-4">
                <p>
                    Мои билеты
                </p>
                <Link href={'/profile/return'}>
                    <p>
                        О возврате билетов
                    </p>
                </Link>
            </div>
            <Tabs defaultValue="active" className="pl-2">
                <TabsList>
                    <TabsTrigger value="active">Активные билеты</TabsTrigger>
                    <TabsTrigger value="history">История</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                    <ActiveTickets />
                </TabsContent>
                <TabsContent value="history">
                    <TicketsHistory />
                </TabsContent>
            </Tabs>

        </div>
    )
}