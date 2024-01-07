'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useState } from 'react'

type Props = {}

const Form = (props: Props) => {
    const [natureName, setNatureName] = useState("")

    const submit = async () => {
        const data = {
            name: natureName
        }
        await axios.post(`/api/definitions/nature/do/create/`, data).then(async (res) => {
            const data = await res.data
            if (data.status === 200) {
                console.log(`Create`)
            } else {
                console.log(`Error`)
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
                    <Input value={natureName} onChange={(e: any) => { setNatureName(e.target.value) }} />
                </div>
            </div>
            <div>
                <Button onClick={submit}>Create</Button>
            </div>
        </div>
    )
}

export default Form