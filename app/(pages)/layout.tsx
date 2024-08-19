import LargeHeader, {MobileHeader} from "@/components/largeHeader";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Layout({children}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <div className="hidden lg:block">
                <LargeHeader/>
            </div>
            <div className="block lg:hidden">
                <MobileHeader/>
            </div>
            <Navbar/>
            {children}
            <Footer/>
        </main>
    )
}