import NavLinks from "@/components/nav-links";
import {Suspense} from "react";

export default function Navbar() {
    return (
        <div className="lg:pt-8">
            <Suspense fallback={"Загрузка..."}>
                <NavLinks />
            </Suspense>
        </div>
    )
}

