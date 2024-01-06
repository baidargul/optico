'use client'
import ToolTipProvider from '@/components/ToolTipProvider/ToolTipProvider'
import { nature } from '@prisma/client'
import axios from 'axios'
import { Eye, EyeOff, Loader } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    nature: nature
    setNature: any
}

const ArchiveController = (props: Props) => {
    const [isWorking, setIsWorking] = useState(false)

    const makeArchive = async () => {
        const data = {
            id: props.nature.id
        }
        setIsWorking(true)
        await axios.patch('/api/definitions/nature/do/archive/', data).then(async (res) => {
            const data = await res.data
            if (data.status === 200) {
                props.setNature(data.data)
            } else {
                console.log(data.message)
            }
        })
        setIsWorking(false)
    }

    const unArchive = async () => {
        const data = {
            id: props.nature.id
        }

        setIsWorking(true)
        await axios.patch('/api/definitions/nature/do/unarchive/', data).then(async (res) => {
            const data = await res.data
            if (data.status === 200) {
                props.setNature(data.data)
            } else {
                console.log(data.message)
            }
        })
        setIsWorking(false)
    }

    if (isWorking) {
        return (
            <div className='absolute right-0 top-1 '>
                <ToolTipProvider content={"Please wait..."}>
                    <Loader className='absolute right-0 top-1 text-xs bg-gradient-to-b from-zinc-200 to-zinc-300 p-1 rounded-md text-zinc-700 animate-spin duration-1000 border border-zinc-300/20 cursor-not-allowed' />
                </ToolTipProvider>
            </div>
        )
    }

    if (props.nature.archived === true) {
        return (
            <div className='absolute right-0 top-1 '>
                <ToolTipProvider content={`Unarchive`}>
                    <EyeOff onClick={unArchive} className='absolute right-0 top-1 text-xs bg-gradient-to-b from-orange-50 to-orange-100 p-1 rounded-md text-red-300 border border-red-300/20 cursor-pointer' />
                </ToolTipProvider>
            </div>
        )
    } else {
        return (
            <div className='absolute right-0 top-1'>
                <ToolTipProvider content={`Archive`}>
                    <Eye onClick={makeArchive} className='text-xs bg-slate-100 p-1 rounded-md text-slate-300 border border-slate-300/20 cursor-pointer' />
                </ToolTipProvider>
            </div>
        )
    }
}

export default ArchiveController