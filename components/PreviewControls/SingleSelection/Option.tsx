'use client'
import ToolTipProvider from '@/components/ToolTipProvider/ToolTipProvider'
import { formalizeText } from '@/lib/my'
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
        option.value && <div onClick={() => handleOptionClick(option)} className={` border rounded transition-all cursor-pointer hover:bg-yellow-50 ${props.selected === option.value ? "bg-gradient-to-b from-amber-100 to-amber-200 border-yellow-500/40" : "bg-gradient-to-b from-zinc-50 to-zinc-100"}`}>
            <ToolTipProvider content={formalizeText(option.value)}>
                <div className='px-2 py-1 text-sm truncate w-36 text-start'>
                    {formalizeText(option.value)}
                </div>
            </ToolTipProvider>
        </div>
    )
}

export default Option