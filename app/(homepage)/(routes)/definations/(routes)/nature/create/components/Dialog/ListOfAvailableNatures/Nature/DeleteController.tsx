import { nature } from '@prisma/client'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
    nature: nature
}

const DeleteController = (props: Props) => {
    return (
        <Trash className='text-xs bg-red-100 p-1 rounded-md text-red-300 border border-red-300/20 cursor-pointer' />
    )
}

export default DeleteController