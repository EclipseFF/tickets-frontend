
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="">
            <div>
                <Image src={'/logo.svg'} alt={'Лого'} width={130} height={111} />
            </div>

            <Link href={'/admin-panel/events'}>
                <p className="">События</p>
            </Link>

            <Link href={'/admin-panel/users'}>
                <p>Пользователи</p>
            </Link>
        </div>
    )
}