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
            <div className='px-2 py-1 text-sm'>
                <ToolTipProvider content={formalizeText(option.value)}>
                {formalizeText(option.value)}
                </ToolTipProvider>
            </div>
        </div>
    )
}

export default Option