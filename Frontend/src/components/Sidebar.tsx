import { Link } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <Link to={"/"} className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <Logo />
            </div>
            Brainly
        </Link>
        <div className="pt-8 pl-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon />} />
            <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        </div>

    </div>
}