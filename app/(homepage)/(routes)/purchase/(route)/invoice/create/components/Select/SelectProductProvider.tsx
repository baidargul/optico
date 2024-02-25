'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../../../../../../../../../components/ui/input'
import PopoverProvider from '../../../../../../../../../components/Popover/PopoverProvider'
import { Search } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { formalizeText } from '@/lib/my'

type Props = {
    children: React.ReactNode
    setValue: any
}

const SelectProductProvider = (props: Props) => {
    const [isToggled, setIsToggled] = useState(false)
    const [item, setItem] = useState({} as any)

    useEffect(() => {
        props.setValue(item)
    }, [item])

    return (
        <div onClick={() => setIsToggled(!isToggled)}>
            <PopoverProvider content={ContentP(setIsToggled, setItem)} open={isToggled}>
                {props.children}
            </PopoverProvider>
        </div >
    )
}

export default SelectProductProvider

function ContentP(setIsToggled: any, setItem: any) {
    const [isMounted, setIsMounted] = useState(false)
    const [value, setValue] = useState('')
    const [availableItems, setAvailableItems] = useState([] as any)
    const [filteredItems, setFilteredItems] = useState([] as any)
    const [selectedItem, setSelectedItem] = useState({} as any)
    const [selectedIndex, setSelectedIndex] = useState(0)

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
        setFilteredItems(availableItems)
        fetchItems()
        setValue('')
    }, [])

    const onChange = (e: any) => {
        setValue(e.target.value)

        if (e.target.value === '') {
            setFilteredItems(availableItems)
            return
        }

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
        setSelectedIndex(0)
        if (filtered.length > 0) {
            setSelectedItem(filtered[0])
            setItem(filtered[0])
        }
    }

    const onKeyDown = (e: any) => {
        if (e.key === 'Escape') {
            setValue('')
            setFilteredItems(availableItems)
            setIsToggled(false)
        } else if (e.key === `Enter`) {
            setSelectedItem(filteredItems[selectedIndex])
            setItem(filteredItems[selectedIndex])
            setFilteredItems(availableItems)
            setIsToggled(false)
        } else if (e.key === 'ArrowDown') {
            if (selectedIndex < filteredItems.length - 1) {
                setSelectedIndex(selectedIndex + 1)
                setSelectedItem(filteredItems[selectedIndex + 1])
                setItem(filteredItems[selectedIndex + 1])
            }
        } else if (e.key === 'ArrowUp') {
            if (selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1)
                setSelectedItem(filteredItems[selectedIndex - 1])
                setItem(filteredItems[selectedIndex - 1])
            }
        }
    }

    const onItemSelect = (item: any, index: number) => {
        setIsToggled(false)
        setSelectedItem(item)
        setValue('')
        setFilteredItems(availableItems)
        setItem(item)
        setSelectedIndex(index)
    }

    const handleBlur = () => {
        setIsToggled(false)
        setFilteredItems(availableItems)
        setValue('')
    }


    return (
        isMounted && <div className='select-none'>
            <div className='flex text-xs items-center'>
                <div className='absolute pl-1'>
                    <Search className='text-site-mainText/40' width={20} />
                </div>
                <div className='w-full'>
                    <Input placeholder='Search' className='pl-8' onChange={onChange} onKeyDown={onKeyDown} onBlur={handleBlur} />
                </div>
            </div>
            <div className='mt-1 text-sm'>
                <div>
                    <div className='grid grid-cols-3 gap-2 truncate text-site-mainText py-1 font-semibold'>
                        <div>
                            <div className=''>
                                Product
                            </div>
                        </div>
                        <div>
                            <div className=''>
                                Nature
                            </div>
                        </div>
                        <div>
                            <div className=''>
                                Category
                            </div>
                        </div>
                    </div>
                    {
                        filteredItems.length > 0 && filteredItems.map((item: any, index: number) => {

                            return (
                                <div className={`${selectedIndex === index && "bg-green-50/80"} text-site-mainText hover:bg-yellow-50/80 w-full text-xs border-b border-dashed`} key={item.id} onClick={() => onItemSelect(item, index)}>

                                    <div className='grid grid-cols-3 gap-2 truncate'>
                                        <div>
                                            <div className=''>
                                                {formalizeText(item.name)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`${item.nature.dynamic && "first-letter:font-semibold"}`}>
                                                {formalizeText(item.nature.name)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className=''>
                                                {formalizeText(item.category.name)}
                                            </div>
                                        </div>
                                    </div>
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