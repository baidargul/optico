import { nature } from '@prisma/client'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import React from 'react'

type Props = {
    nature: nature
}

const ArchiveController = (props: Props) => {

    const makeArchive = async () => {
        const data = {
            id: props.nature.id
        }
        await axios.patch('/api/definitions/nature/do/archive/', data).then(async (res) => {
            const { data } = await res.data
            if (data.status === 200) {
                console.log(data.message)
            } else{
                console.log(data.message)
            }
        })
    }

    const unArchive = async () => {

    }

    if (props.nature.archived === true) {
        return (
            <EyeOff onClick={makeArchive} className='text-xs bg-gradient-to-b from-orange-50 to-orange-100 p-1 rounded-md text-red-300 border border-red-300/20' />
        )
    } else {
        return (
            <Eye onClick={unArchive} className='text-xs bg-gradient-to-b from-teal-50 to-teal-100 p-1 rounded-md text-cyan-300 border border-teal-300/20' />
        )
    }
}

export default ArchiveController