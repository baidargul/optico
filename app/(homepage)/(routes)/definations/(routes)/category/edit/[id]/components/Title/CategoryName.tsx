'use client'
import { Input } from '@/components/ui/input'
import { formalizeText } from '@/lib/my'
import { category, nature } from '@prisma/client'
import { EditIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'


type Props = {
    category: any
}

const CategoryName = (props: Props) => {
    const [category, setCategory] = useState(props.category)
    const [value, setValue] = useState("")
    const Ref: any = useRef(null)
    const [isEditable, setIsEditable] = useState(false)

    useEffect(() => {
        setCategory(props.category)
        setValue(formalizeText(props.category.name))
    }, [props.category])

    const handleClickEvent = () => {
        setIsEditable(true)
        if (Ref) {
            setTimeout(() => {
                Ref.current.select();
            }, 0); // Use a minimal delay
        }
    }

    const handleBlurEvent = () => {
        setValue(formalizeText(category.name))
        setIsEditable(false)
    }

    const handleKeyDownEvent = (e: any) => {
        if (e.key === "Escape") {
            setValue(formalizeText(category.name))
            setIsEditable(false)
        }
    }

    const handleTextBoxClickEvent = () => {
        if (Ref) {
            Ref.current.select()
        }
    }

    if (isEditable) {
        return (
            <div>
                <Input onClick={handleTextBoxClickEvent} ref={Ref} value={value} onChange={(e: any) => { setValue(e.target.value) }} onBlur={handleBlurEvent} onKeyDown={handleKeyDownEvent} />
            </div>
        )
    }

    return (
        <div onClick={handleClickEvent} className=' flex gap-1 items-center group-hover:cursor-text'>
            <div className="text-2xl font-semibold hover:tracking-wide transition-all duration-1000">
                {
                    formalizeText(category.name)
                }
            </div>
            <div className='-ml-3 -mr-3 group-hover:m-0 transition-all duration-1000'>
                <EditIcon className='w-4 h-4 text-site-colors-secondary opacity-0 group-hover:opacity-100 transition-all duration-1000 transform scale-75 group-hover:scale-100' />
            </div>
        </div>
    )
}

export default CategoryName