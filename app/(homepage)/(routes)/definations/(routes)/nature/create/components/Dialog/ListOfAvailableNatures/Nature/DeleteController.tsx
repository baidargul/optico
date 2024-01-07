import { nature } from '@prisma/client'
import axios from 'axios'
import { Loader, Trash } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    nature: nature
    fetch: any
}

const DeleteController = (props: Props) => {
    const [isWorking, setIsWorking] = useState(false)

    const deleteNature = async () => {
        setIsWorking(true)
        const data = {
            id: props.nature.id
        }
        await axios.post(`/api/definitions/nature/do/delete`, data).then(async (res) => {
            const data = await res.data
            if (data.status === 200) {
                props.fetch()
            } else {
                console.log(data.message)
            }
        })
        setIsWorking(false)
    }

    if (isWorking) {
        return (
            <Loader className='text-xs bg-gradient-to-b from-zinc-200 to-zinc-300 p-1 rounded-md text-zinc-700 animate-spin duration-1000 border border-zinc-300/20 cursor-not-allowed' />
        )
    }
    return (
        <Trash onClick={deleteNature} className='text-xs bg-red-100 p-1 rounded-md text-red-300 border border-red-300/20 cursor-pointer' />
    )
}

export default DeleteController