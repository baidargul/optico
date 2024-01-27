'use client'
import React from 'react'
import PopoverProvider from '../Popover/PopoverProvider'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import AccountRow from './AccountSelection/AccountRow'

type Props = {
    children: React.ReactNode
}

const AccountSelection = (props: Props) => {

    const handleTrigger = async () => {

    }


    return (
        <div>
            <div onClick={handleTrigger}>
                <PopoverProvider content={PopoverContent()}>
                    {props.children}
                </PopoverProvider>
            </div>
        </div>
    )
}

export default AccountSelection

function PopoverContent() {

    return (
        <div className='select-none'>
            <div className='flex gap-1 items-center relative'>
                <Search className='absolute text-site-mainText/30 left-2 pointer-events-none' size={16} />
                <Input placeholder='Search' className='pl-7' />
            </div>
            <div className='text-xs flex justify-center items-center'>
                <AccountRow />
            </div>
        </div>
    )
}