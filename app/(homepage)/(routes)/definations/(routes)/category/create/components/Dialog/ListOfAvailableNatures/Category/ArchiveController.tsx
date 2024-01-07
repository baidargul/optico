'use client'
import { category } from '@prisma/client'
import axios from 'axios'
import { Eye, EyeOff, Loader } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {
    category: category
    setCategory: any
}

const ArchiveController = (props: Props) => {
    const [isWorking, setIsWorking] = useState(false)

    const makeArchive = async () => {
        const data = {
            id: props.category.id
        }
        setIsWorking(true)
        await axios.patch('/api/definitions/category/do/archive/', data).then(async (res) => {
            const data = await res.data
            if (data.status === 200) {
                props.setCategory(data.data)
            } else {
                toast.warning(data.message)
            }
        })
        setIsWorking(false)
    }

    const unArchive = async () => {
        const data = {
            id: props.category.id
        }

        setIsWorking(true)
        await axios.patch('/api/definitions/category/do/unarchive/', data).then(async (res) => {
            const data = await res.data
            if (data.status === 200) {
                props.setCategory(data.data)
            } else {
                toast.warning(data.message)
            }
        })
        setIsWorking(false)
    }

    if (isWorking) {
        return (
            <Loader className='text-xs bg-gradient-to-b from-zinc-200 to-zinc-300 p-1 rounded-md text-zinc-700 animate-spin duration-1000 border border-zinc-300/20 cursor-not-allowed' />
        )
    }

    if (props.category.archived === true) {
        return (
            <EyeOff onClick={unArchive} className='text-xs bg-gradient-to-b from-orange-50 to-orange-100 p-1 rounded-md text-red-300 border border-red-300/20 cursor-pointer' />
        )
    } else {
        return (
            <Eye onClick={makeArchive} className='text-xs bg-slate-100 p-1 rounded-md text-slate-300 border border-slate-300/20 cursor-pointer' />
        )
    }
}

export default ArchiveController