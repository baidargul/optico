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
    const [isDynamic, setIsDynamic] = useState(false)
    const Ref: any = useRef(null)

    const submit = async () => {
        const data = {
            name: natureName,
            dynamic: isDynamic
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
            <div className='grid grid-cols-2 items-center gap-2 jus'>
                <div>
                    <div>
                        Name:
                    </div>
                    <div>
                        <Input ref={Ref} value={natureName} onChange={(e: any) => { setNatureName(e.target.value) }} />
                    </div>
                </div>
                <div className=''>
                    <div>
                        Dynamic:
                    </div>
                    <div className='relative'>
                        <div onClick={() => setIsDynamic(!isDynamic)} className={`h-8 w-full flex items-center pl-2 text-white border rounded border-zinc-300/65 ${isDynamic && "bg-site-colors-secondary"}`}></div>
                        {isDynamic && <div className='scale-75 text-xs absolute -left-16 w-full'>
                        New items are added during the purchase process, with each selection of this particular nature triggering the addition of fresh items.
                        </div>}
                    </div>
                </div>
            </div>

            <div>
                <Button onClick={submit}>Create</Button>
            </div>
        </div>
    )
}

export default Form