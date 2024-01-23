'use client'
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
    const [isSelected, setIsSelected] = React.useState(false)

    React.useEffect(() => {
        if (props.selected.includes(option.value)) {
            setIsSelected(true)
        } else {
            setIsSelected(false)
        }
    }, [props.selected])

    const handleOptionClick = () => {
        props.setSelected((prevSelected: any) => {
            if (prevSelected.includes(option.value)) {
                const index = prevSelected.indexOf(option.value);
                const updatedSelected = [...prevSelected];
                updatedSelected.splice(index, 1);
                setIsSelected(false);
                return updatedSelected;
            } else {
                const updatedSelected = [...prevSelected, option.value];
                setIsSelected(true);
                return updatedSelected;
            }
        });
    };

    return (
        option.value && <div onClick={handleOptionClick} className={`bg-gradient-to-b from-zinc-50 to-zinc-100 border rounded transition-all cursor-pointer hover:bg-yellow-50 ${props.selected && isSelected && "bg-gradient-to-b from-amber-100 to-amber-200 border-yellow-500/40"}`}>
            <div className='px-2 py-1 text-sm truncate'>
                {formalizeText(option.value)}
            </div>
        </div>
    )
}

export default Option