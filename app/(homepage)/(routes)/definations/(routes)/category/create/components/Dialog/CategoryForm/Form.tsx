'use client'
import { ComboBoxProvider } from '@/components/ComboBox/ComboBoxProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import Natures from './Form/Natures'
import { Loader, Plus } from 'lucide-react'


type Props = {
    fetch: any
}

const Form = (props: Props) => {
    const [categoryName, setCategoryName] = useState("")
    const [selectedNature, setSelectedNature] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const Ref: any = useRef(null)

    const submit = async () => {
        const data = {
            name: categoryName,
            nature: selectedNature
        }
        setIsCreating(true)
        await axios.post(`/api/definitions/category/do/create/`, data).then(async (res) => {
            const data = await res.data
            if (data.status === 200) {
                await props.fetch()
                if (Ref) {
                    Ref.current.select()
                }
            } else {
                toast.warning(data.message)
            }
        })
        setIsCreating(false)
    }

    return (
        <div className='flex flex-col gap-2'>
            <div>
                <div>
                    Name:
                </div>
                <div>
                    <Input ref={Ref} value={categoryName} onChange={(e: any) => { setCategoryName(e.target.value) }} />
                </div>
            </div>
            <div>
                <div>
                    Nature:
                </div>
                <div>
                    <Natures setNature={setSelectedNature} />
                </div>
            </div>
            <div>
                <Button onClick={submit} className='flex gap-2 items-center'>
                    <div>
                        {!isCreating && <Plus className='w-4 h-4' />}
                        {isCreating && <Loader className={`w-4 h-4 animate-spin duration-1000 opacity-0 transition-all ${isCreating && "opacity-100"}`} />}
                    </div>
                    <div>
                        Create
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default Form