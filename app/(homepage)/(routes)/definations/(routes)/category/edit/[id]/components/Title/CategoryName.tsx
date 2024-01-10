'use client'
import { Input } from '@/components/ui/input'
import { formalizeText } from '@/lib/my'
import { category, nature } from '@prisma/client'
import axios from 'axios'
import { EditIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'


type Props = {
    category: any
}

const CategoryName = (props: Props) => {
    const [category, setCategory] = useState(props.category)
    const [value, setValue] = useState("")
    const Ref: any = useRef(null)
    const [isEditable, setIsEditable] = useState(false)

    const SubmitChange = async () => {
        if (value.toLocaleLowerCase() === String(category.name).toLocaleLowerCase()) {
            return
        }

        if (value.length < 1) {
            toast.message(`Name cannot be empty`)
        }

        const data = {
            id: category.id,
            name: value.toLocaleLowerCase()
        }

        await axios.patch(`/api/definitions/category/do/rename/`, data).then(async (res: any) => {
            const response = await res.data
            if (response.status === 200) {
                setCategory(response.data)
                toast.success(response.message)
                setIsEditable(false)
                setValue(formalizeText(response.data.name))
            } else {
                toast.warning(response.message)
            }
        })
    }

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

    const handleKeyDownEvent = async (e: any) => {
        if (e.key === "Escape") {
            setValue(formalizeText(category.name))
            setIsEditable(false)
        } else if(e.key==="Enter")
        {
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