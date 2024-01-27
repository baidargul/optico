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

            <div className=''>
                <div className='text-xs text-site-mainText/60 font-sans pl-1 -mb-1 text-left py-1'>
                    Recent accounts
                </div>
                <div className='text-xs flex justify-center items-center border-b border-dashed'>
                    <AccountRow />
                </div>
            </div>
            <div className='text-xs text-site-mainText/60 font-sans pl-1 -mb-1 text-left py-1'>
                Accounts
            </div>
            <div className='text-xs border-b border-dashed'>
                <AccountRow />
            </div>
        </div>
    )
}