import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SidebarItem } from './SidebarItem'
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from 'react-icons/io5'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { LogoutButton } from './LogoutButton'

const menuItems = [
    {
        name: 'Dashboard',
        icon: <IoCalendarOutline size={30} />,
        href: '/dashboard'
    },
    {
        name: 'Rest TODOS',
        icon: <IoCheckboxOutline size={30} />,
        href: '/dashboard/rest-todos'
    },
    {
        name: 'Server Actions',
        icon: <IoListOutline size={30} />,
        href: '/dashboard/server-todos'
    },
    {
        name: 'Cookies',
        icon: <IoCodeWorkingOutline size={30} />,
        href: '/dashboard/cookies'
    },
    {
        icon: <IoBasketOutline />,
        name: 'Products',
        href: '/dashboard/products'
    },
    {
        icon: <IoPersonOutline />,
        name: 'Profile',
        href: '/dashboard/profile'
    }
]


export const Sidebar = async () => {

    const session = await getServerSession(authOptions);

    const userName = session?.user?.name ?? 'No name';
    const avatarUrl = session?.user?.image ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';
    const userRole = session?.user?.roles;

    return (
        <aside className="ml-[-100%] fixed overflow-y-auto z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    <Link href="/" title="home">
                        <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" width={128} height={128} className="w-32" alt="tailus logo" />
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <Image src={avatarUrl} width={220} height={220} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                    <span className="hidden text-gray-400 lg:block capitalize">{userRole?.join(',')}</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {
                        menuItems.map((item, index) => (
                            <SidebarItem 
                                key={index}
                                {...item}
                             />
                        ))
                    }
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <LogoutButton />
            </div>
        </aside>
    )
}
