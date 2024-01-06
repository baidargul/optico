'use client'
import { nature } from '@prisma/client'
import { ArchiveX, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import ArchiveController from './Nature/ArchiveController'

type Props = {
    nature: nature
}

const Nature = (props: Props) => {
    const [nature, setNature] = useState(props.nature)

    return (
        <div className='relative py-1 border-b hover:bg-zinc-100/50'>
            <div className='absolute right-0 top-1'>
                <ArchiveController nature={nature} />
            </div>
            <div className=''>
                {nature.name}
            </div>
        </div>
    )
}

export default Nature