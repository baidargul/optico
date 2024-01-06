'use client'
import { nature } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import ArchiveController from './Nature/ArchiveController'
type Props = {
    nature: nature
}

const Nature = (props: Props) => {
    const [nature, setNature] = useState(props.nature)

    return (
        nature && <div className='relative py-1 border-b hover:bg-zinc-100/50'>
            <div>
                <ArchiveController nature={nature} setNature={setNature} />
            </div>
            <div className=''>
                {nature.name}
            </div>
        </div>
    )
}

export default Nature