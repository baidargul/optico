'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import PopoverProvider from '../Popover/PopoverProvider'
import { Search } from 'lucide-react'
import { Separator } from '../ui/separator'
import axios from 'axios'
import { toast } from 'sonner'
import { formalizeText } from '@/lib/my'

type Props = {
}

const SelectProviderAdvance = (props: Props) => {
    const [isToggled, setIsToggled] = useState(false)

    return (
        <div onClick={() => setIsToggled(!isToggled)}>
            <PopoverProvider content={ContentP(setIsToggled)} open={isToggled}>
                <div>
                    Select Product
                </div>
            </PopoverProvider>
        </div>
    )
}

export default SelectProviderAdvance

function ContentP(setIsToggled: any) {
    const [isMounted, setIsMounted] = useState(false)
    const [value, setValue] = useState('')
    const [availableItems, setAvailableItems] = useState([] as any)
    const [filteredItems, setFilteredItems] = useState([] as any)

    const fetchItems = async () => {
        try {
            await axios.get(`/api/definitions/item/find/findall/`).then(async (res: any) => {
                const response = await res.data
                if (response.status === 200) {
                    setAvailableItems(response.data)
                    setFilteredItems(response.data)
                } else {
                    toast.warning(response.message)
                }
            })
        } catch (error) {
            toast.error('Failed to fetch items')
        }
    }

    useEffect(() => {
        setIsMounted(true)
        fetchItems()
    }, [])

    const onChange = (e: any) => {
        setValue(e.target.value)

        let filtered

        filtered = availableItems.filter((item: any) => {
            const name = item.name.toLowerCase()
            return name.includes(e.target.value.toLowerCase())
        })

        if (filtered.length === 0) {
            filtered = availableItems.filter((item: any) => {
                const name = item.nature.name
                return name.includes(e.target.value.toLowerCase())
            })
        }

        if (filtered.length === 0) {
            filtered = availableItems.filter((item: any) => {
                const name = item.category.name
                return name.includes(e.target.value.toLowerCase())
            })
        }

        setFilteredItems(filtered)

    }

    const onKeyDown = (e: any) => {
        if (e.key === 'Escape') {
            setValue('')
            setIsToggled(false)
        }
    }


    return (
        isMounted && <div className='select-none'>
            <div className='flex text-xs items-center'>
                <div className='absolute pl-1'>
                    <Search className='text-site-mainText/40' width={20} />
                </div>
                <div className=''>
                    <Input placeholder='Search' className='pl-8' onChange={onChange} onKeyDown={onKeyDown} onBlur={() => setIsToggled(false)} />
                </div>
            </div>
            <div className='mt-1 text-sm'>
                <div>
                    {
                        filteredItems.length > 0 && filteredItems.map((item: any, index: number) => {

                            return (
                                <div className='' key={item.id}>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <div className='text-site-mainText/40'>
                                                {formalizeText(item.name)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className='text-site-mainText/40'>
                                                {formalizeText(item.nature.name)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className='text-site-mainText/40'>
                                                {formalizeText(item.category.name)}
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                </div>
                            )
                        })
                    }
                    {
                        availableItems.length === 0 && (
                            <div className='mt-2'>
                                <div className=' text-xs text-site-mainText/40'>
                                    No items available
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}