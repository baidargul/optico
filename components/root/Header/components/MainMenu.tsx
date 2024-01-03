import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {}

const MainMenu = (props: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='text-site-mainText'>
                Open
            </DropdownMenuTrigger>
            <DropdownMenuContent collisionPadding={20}>
                <DropdownMenuLabel className='select-none text-site-mainText'>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MainMenu