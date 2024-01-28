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
    setValue?: any
}

const AccountSelection = (props: Props) => {
    const { mode, setValue } = props
    const [isToggled, setIsToggled] = React.useState<boolean>(false)

    const handleTrigger = async () => {
        setIsToggled(!isToggled)
    }


    return (
        <div>
            <div onClick={handleTrigger}>
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
            return account.name.toLowerCase().includes(text.toLowerCase())
        })
        if (filteredAccounts.length > 0) {
            setValue(filteredAccounts[0])
        }
        setDemoAccounts(filteredAccounts)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (demoAccounts.length > 0) {
                setValue(demoAccounts[0])
                setIsToggled(false)
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
                            {
                                demoAccounts.map((account: any, index: number) => {

                                    const handleAccountClick = () => {
                                        if (setValue) {
                                            setInputValue('')
                                            setValue(account)
                                        }
                                    }

                                    return (
                                        <div onClick={handleAccountClick} key={index} className='text-xs border-b border-dashed'>
                                            <AccountRow account={account} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }

        </div >
    )
}