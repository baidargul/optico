'use client'
import ToolTipProvider from '@/components/ToolTipProvider/ToolTipProvider'
import { formalizeText } from '@/lib/my'
import { propertyOptions } from '@prisma/client'
import React, { useEffect } from 'react'

type Props = {
    property: any
    option: propertyOptions
    selected: any
    setSelected: any
}

const Option = (props: Props) => {
    const option = props.option
    const [isSelected, setIsSelected] = React.useState(false)

    useEffect(() => {
        if (props.selected.includes(String(option.value).toLocaleLowerCase())) {
            setIsSelected(true)
        } else {
            setIsSelected(false)
        }
    }, [props.selected])

    useEffect(() => {
        if (props.property.default) {
            const defaultValue = String(props.property.default.value).toLocaleLowerCase()
            if (defaultValue === String(option.value).toLocaleLowerCase()) {
                setIsSelected(true)
                const updatedValues = [...props.selected, String(option.value)]
                props.setSelected(updatedValues)
            }
        }
    }, [])

    const handleOptionClick = () => {
        props.setSelected((prevSelected: any) => {
            if (prevSelected.includes(String(option.value).toLocaleLowerCase())) {
                const updatedSelected = prevSelected.filter((item: any) => item !== String(option.value).toLocaleLowerCase());
                setIsSelected(false);
                return updatedSelected;
            } else {
                const updatedSelected = [...prevSelected, String(option.value).toLocaleLowerCase()];
                setIsSelected(true);
                return updatedSelected;
            }
        });
    };

    return (
        option.value && <div onClick={handleOptionClick} className={`border rounded transition-all cursor-pointer hover:bg-yellow-50 ${props.selected && isSelected ? "bg-gradient-to-b from-amber-100 to-amber-200 border-yellow-500/40" : "bg-gradient-to-b from-zinc-50 to-zinc-100"}`}>
            <ToolTipProvider content={formalizeText(option.value)}>
                <div className='px-2 py-1 text-sm truncate w-36 text-start'>
                    {formalizeText(option.value)}
                </div>
            </ToolTipProvider>
        </div>
    )
}

export default Option