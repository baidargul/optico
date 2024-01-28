'use client'
import React, { useEffect } from 'react'
import PopoverProvider from '../Popover/PopoverProvider'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import AccountRow from './AccountSelection/AccountRow'
import axios from 'axios'
import { toast } from 'sonner'

type Props = {
    children: React.ReactNode
    mode: 'vendor' | 'customer'
}

const AccountSelection = (props: Props) => {
    const { mode } = props

    const handleTrigger = async () => {

    }


    return (
        <div>
            <div onClick={handleTrigger}>
                <PopoverProvider content={PopoverContent(mode)}>
                    {props.children}
                </PopoverProvider>
            </div>
        </div>
    )
}

export default AccountSelection

function PopoverContent(mode: 'vendor' | 'customer' = 'vendor') {
    const [isMounted, setIsMounted] = React.useState<boolean>(false)
    const [accounts, setAccounts] = React.useState<any[]>([])
    const [demoAccounts, setDemoAccounts] = React.useState<any[]>([])

    const fetchAccounts = async () => {
        let apiUrl = ''
        if (mode === 'vendor') {
            apiUrl = '/api/vendors/find/findall/'
        }

        try {
            await axios.get(apiUrl).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    setAccounts(response.data)
                    setDemoAccounts(response.data)
                } else {
                    setAccounts([])
                    setDemoAccounts([])
                    toast.warning(response.message)
                }
            })
        } catch (error: any) {
            setAccounts([])
            setDemoAccounts([])
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchAccounts()
        setIsMounted(true)
    }, [])

    return (
        isMounted && accounts.length > 0 && <div className='select-none'>
            <div className='flex gap-1 items-center relative'>
                <Search className='absolute text-site-mainText/30 left-2 pointer-events-none' size={16} />
                <Input placeholder='Search' className='pl-7' />
            </div>

            <div className=''>
                <div className='text-xs text-site-mainText/60 font-sans pl-1 -mb-1 text-left py-1'>
                    Recent accounts
                </div>
                <div className='text-xs flex justify-center items-center border-b border-dashed'>
                    <AccountRow account={demoAccounts[0]} />
                </div>
            </div>
            <div>
                <div className='text-xs text-site-mainText/60 font-sans pl-1 -mb-1 text-left py-1'>
                    Accounts
                </div>
                <div className='w-full'>
                    {
                        demoAccounts.map((account: any, index: number) => {
                            return (
                                <div key={index} className='text-xs border-b border-dashed'>
                                    <AccountRow account={account} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}