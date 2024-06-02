import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="">
            <div>
                <TooltipProvider>
                    <Link href={'/admin-panel/events'}>
                        <Tooltip>
                            <TooltipTrigger><Image src={'/icons/event.svg'} alt={'События'} width={24} height={24}/></TooltipTrigger>
                            <TooltipContent>
                                <p>События</p>
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                </TooltipProvider>
            </div>
        </div>
    )
}