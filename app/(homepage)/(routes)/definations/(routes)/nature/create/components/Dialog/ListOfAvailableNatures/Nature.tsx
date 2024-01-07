'use client'
import { nature } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import ArchiveController from './Nature/ArchiveController'
import { formalizeText } from '@/lib/my'
type Props = {
    nature: nature
}

const Nature = (props: Props) => {
    const [nature, setNature] = useState(props.nature)

    return (
        nature && <div className='py-1 border-b hover:bg-zinc-100/50 flex justify-between'>
            <div className=''>
                {formalizeText(nature.name)}
            </div>
            <div className='grid grid-cols-2 gap-1'>
                <div>
                    <ArchiveController nature={nature} setNature={setNature} />
                </div>
                <div>
                    Del
                </div>
            </div>
        </div>
    )
}

export default Nature