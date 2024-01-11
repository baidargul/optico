'use client'
import { formalizeText } from '@/lib/my'
import { Input } from "@/components/ui/input"
import React, { useEffect, useRef, useState } from 'react'
import { EditIcon } from 'lucide-react'

type Props = {
    value: string
    setValue: any
    onSubmit: Promise<any> | any
    children: React.ReactNode
}

const HiddenInput = (props: Props) => {
    const [input, setInput] = useState(props.value)
    const [value, setValue] = useState("")
    const Ref: any = useRef(null)
    const [isEditable, setIsEditable] = useState(false)

    const SubmitChange = async () => {
        await props.onSubmit()
        props.setValue(formalizeText(value))
        setIsEditable(false)
    }

    useEffect(() => {
        setInput(props.value)
        setValue(formalizeText(props.value))
    }, [props.value])

    const handleClickEvent = () => {
        setIsEditable(true)
        if (Ref) {
            setTimeout(() => {
                Ref.current.select();
            }, 0); // Use a minimal delay
        }
    }

    const handleBlurEvent = () => {
        setValue(formalizeText(input))
        setIsEditable(false)
    }

    const handleKeyDownEvent = async (e: any) => {
        if (e.key === "Escape") {
            setValue(formalizeText(input))
            setIsEditable(false)
        } else if (e.key === "Enter") {
            await SubmitChange()
        }
    }

    const handleTextBoxClickEvent = () => {
        if (Ref) {
            Ref.current.select()
        }
    }

    if (isEditable) {
        return (
            <div className='w-[50%]'>
                <Input onClick={handleTextBoxClickEvent} ref={Ref} value={value} onChange={(e: any) => { setValue(e.target.value) }} onBlur={handleBlurEvent} onKeyDown={handleKeyDownEvent} />
            </div>
        )
    }

    return (
        <div className='group'>
            <div onClick={handleClickEvent} className=' flex gap-1 items-center group-hover:cursor-text'>
                <div className="hover:tracking-wide transition-all duration-1000">
                    {
                        props.children
                    }
                </div>
                <div className='-ml-3 -mr-3 group-hover:m-0 transition-all duration-1000'>
                    <EditIcon className='w-4 h-4 text-site-colors-secondary opacity-0 group-hover:opacity-100 transition-all duration-1000 transform scale-75 group-hover:scale-100' />
                </div>
            </div>
        </div>
    )
}

export default HiddenInput