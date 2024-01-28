'use client'
import React, { useEffect } from 'react'
import PopoverProvider from '../Popover/PopoverProvider'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import AccountRow from './AccountSelection/AccountRow'
import axios from 'axios'
import { toast } from 'sonner'
import { ScrollArea } from '../ui/scroll-area'

type Props = {
    children: React.ReactNode
    mode: 'vendor' | 'customer'
    setValue?: any
}

const AccountSelection = (props: Props) => {
    const { mode, setValue } = props
    const [isToggled, setIsToggled] = React.useState<boolean>(false)

    const handleTrigger = async () => {
        setIsToggled(!isToggled)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setIsToggled(!isToggled)
        } else if (e.key === 'Escape') {
            setIsToggled(false)
        }
    }


    return (
        <div>
            <div onClick={handleTrigger} onKeyDown={handleKeyDown}>
                <PopoverProvider content={PopoverContent(mode, setValue, setIsToggled)} open={isToggled}>
                    {props.children}
                </PopoverProvider>
            </div>
        </div>
    )
}

export default AccountSelection

function PopoverContent(mode: 'vendor' | 'customer' = 'vendor', setValue?: any, setIsToggled?: any) {
    const [isMounted, setIsMounted] = React.useState<boolean>(false)
    const [accounts, setAccounts] = React.useState<any[]>([])
    const [demoAccounts, setDemoAccounts] = React.useState<any[]>([])
    const [inputValue, setInputValue] = React.useState<string>('')
    const [trackIndex, setTrackIndex] = React.useState<number>(0)

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

    const handleTextFilter = (e: any) => {
        const text = e.target.value
        setInputValue(text)
        if (text.length < 1) setDemoAccounts(accounts)
        const filteredAccounts = accounts.filter((account: any) => {
            const phone = account.phone.toLowerCase().includes(text.toLowerCase())
            const name = account.name.toLowerCase().includes(text.toLowerCase())
            const contact = account.contact.toLowerCase().includes(text.toLowerCase())
            const email = account.email.toLowerCase().includes(text.toLowerCase())
            const address = account.address.toLowerCase().includes(text.toLowerCase())
            if (contact) {
                return contact
            }
            if (email) {
                return email
            }
            if (phone) {
                return phone
            }
            if (name) {
                return name
            }
            if (address) {
                return address
            }
        })
        if (filteredAccounts.length > 0) {
            setValue(filteredAccounts[0])
        }
        setDemoAccounts(filteredAccounts)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (demoAccounts.length === 1) {
                setValue(demoAccounts[0])
            } else {
                setValue(demoAccounts[trackIndex])
            }
            setIsToggled(false)
        } else if (e.key === 'ArrowDown') {
            if (trackIndex < demoAccounts.length - 1) {
                setTrackIndex(trackIndex + 1)
                setValue(demoAccounts[trackIndex + 1])
            }
        } else if (e.key === 'ArrowUp') {
            if (trackIndex > 0) {
                setTrackIndex(trackIndex - 1)
                setValue(demoAccounts[trackIndex - 1])
            }
        }
    }

    return (
        isMounted && <div className='select-none'>
            <div className='flex gap-1 items-center relative'>
                <Search className='absolute text-site-mainText/30 left-2 pointer-events-none' size={16} />
                <Input placeholder='Search' className='pl-7' value={inputValue} onChange={handleTextFilter} onKeyDown={handleKeyDown} />
            </div>

            {
                demoAccounts.length < 1 && (
                    <div className='text-xs text-site-mainText/60 font-sans pl-1 -mb-1 text-left py-1'>
                        No accounts found
                    </div>
                )
            }

            {
                demoAccounts.length > 0 && (
                    <div>
                        <div className='text-xs text-site-mainText/60 font-sans pl-1 -mb-1 text-left py-1'>
                            Accounts ({demoAccounts.length} found)
                        </div>
                        <div className='w-full'>
                            <ScrollArea className='h-[80px] p-1 pr-4' >
                                {
                                    demoAccounts.map((account: any, index: number) => {

                                        const handleAccountClick = () => {
                                            if (setValue) {
                                                setInputValue('')
                                                setValue(account)
                                                setTrackIndex(index)
                                            }
                                        }

                                        return (
                                            <div onClick={handleAccountClick} key={index} className={`text-xs border-b border-dashed ${trackIndex === index && "bg-green-50/80"}`}>
                                                <AccountRow account={account} />
                                            </div>
                                        )
                                    })
                                }
                            </ScrollArea>
                        </div>
                    </div>
                )
            }

        </div >
    )
}