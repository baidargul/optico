import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'

type Props = {}

const ProfileMenu = (props: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='text-site-mainText transition-all duration-500 focus:outline-none focus:bg-site-mainText/20 rounded p-1'>
                <div className='flex gap-2 items-center text-site-mainText p-1 group'>
                    <div>
                        <Image src={"/Header/Logo/siteLogo.png"} width={35} height={35} alt='profile-picture' className='' />
                    </div>
                    <div className='flex flex-col items-start'>
                        <div>
                            Baidar Gul
                        </div>
                        <div className='text-xs '>
                            baidargul@outlook.com
                        </div>
                    </div>
                    <div>
                        <ArrowDown className='w-5 h-5 text-site-mainText/60 transition-all duration-1000 opacity-0 group-hover:opacity-100' />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent collisionPadding={20}>
                <DropdownMenuLabel className='select-none text-site-mainText text-xs text-center font-sans'>SUPER ADMIN</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>Billing</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>Team</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileMenu