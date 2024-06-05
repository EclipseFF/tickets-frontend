
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="">
            <Link href={'/admin-panel/events'}>
                <p>События</p>
            </Link>
        </div>
    )
}