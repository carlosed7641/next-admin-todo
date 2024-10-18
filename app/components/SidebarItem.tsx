'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
    name: string,
    href: string,
    icon: React.ReactNode
}

export const SidebarItem = ({ name, href, icon}: Props) => {

    const pathName = usePathname()

    return (
        <li>
            <Link href={href} className={`
                    px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
                    ${pathName === href ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}
                `}>
                {icon}
                <span className="-mr-1 font-medium">{name}</span>
            </Link>
        </li>
    )
}
