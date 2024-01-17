'use client'
import { propertyOptions } from '@prisma/client'
import React from 'react'

type Props = {
    option: propertyOptions
    selected: any
    setSelected: any
}

const Option = (props: Props) => {
    const option = props.option

    const handleOptionClick = (option: any) => {
        if (props.selected === option.value) return props.setSelected(null)
        props.setSelected(option.value)
    }

    return (
        <div onClick={() => handleOptionClick(option)} className={`bg-gradient-to-b from-zinc-50 to-zinc-100 border rounded transition-all cursor-pointer hover:bg-yellow-50 ${props.selected === option.value && "bg-gradient-to-b from-amber-50 to-amber-100 border-yellow-500/40"}`}>
            <div className='px-2 py-1 text-sm'>
                {option.value}
            </div>
        </div>
    )
}

export default Option