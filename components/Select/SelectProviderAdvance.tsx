'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import PopoverProvider from '../Popover/PopoverProvider'
import { Search } from 'lucide-react'

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
    const [value, setValue] = useState('')

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    const onKeyDown = (e:any)=>{
        if(e.key === 'Escape'){
            setValue('')
            setIsToggled(false)
        }
    }


    return (
        <div className='select-none'>
            <div className='flex text-xs items-center'>
                <div className='absolute pl-1'>
                    <Search className='text-site-mainText/40' width={20} />
                </div>
                <div className=''>
                    <Input placeholder='Search' className='pl-8' onChange={onChange} onKeyDown={onKeyDown} onBlur={()=>setIsToggled(false)} />
                </div>
            </div>
        </div>
    )
}