'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'


type Props = {
    fetch: any
}

const Form = (props: Props) => {
    const [natureName, setNatureName] = useState("")
    const Ref: any = useRef(null)

    const submit = async () => {
        const data = {
            name: natureName
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
                    <Input ref={Ref} value={natureName} onChange={(e: any) => { setNatureName(e.target.value) }} />
                </div>
            </div>
            <div>
                <Button onClick={submit}>Create</Button>
            </div>
        </div>
    )
}

export default Form