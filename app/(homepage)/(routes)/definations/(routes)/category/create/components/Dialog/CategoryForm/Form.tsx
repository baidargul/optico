'use client'
import { ComboBoxProvider } from '@/components/ComboBox/ComboBoxProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import Natures from './Form/Natures'


type Props = {
    fetch: any
}

const Form = (props: Props) => {
    const [categoryName, setCategoryName] = useState("")
    const Ref: any = useRef(null)

    const submit = async () => {
        const data = {
            name: categoryName
        }
        await axios.post(`/api/definitions/nature/do/create/`, data).then(async (res) => {
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
                    <Natures/>
                </div>
            </div>
            <div>
                <Button onClick={submit}>Create</Button>
            </div>
        </div>
    )
}

export default Form