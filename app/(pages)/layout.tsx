import Header from "@/components/header";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Layout({children}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <Header />
            <Navbar />
                {children}
            <Footer />
        </main>
    )
}