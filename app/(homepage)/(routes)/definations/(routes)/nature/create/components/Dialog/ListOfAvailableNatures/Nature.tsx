'use client'
import { nature } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import ArchiveController from './Nature/ArchiveController'
import { formalizeText } from '@/lib/my'
import DeleteController from './Nature/DeleteController'
type Props = {
    nature: nature
    fetch: any
}

const Nature = (props: Props) => {
    const [nature, setNature] = useState(props.nature)
    console.log(nature)

    return (
        nature && <div className={`py-1 border-b hover:bg-zinc-100/50 flex justify-between items-center`}>
            <div className={`${nature.dynamic === true ? "first-letter:font-bold" : null}`}>
                {formalizeText(nature.name)}
            </div>
            <div className='grid grid-cols-2 gap-1 items-center'>
                <div>
                    <ArchiveController nature={nature} setNature={setNature} />
                </div>
                <div>
                    <DeleteController nature={nature} fetch={props.fetch} />
                </div>
            </div>
        </div>
    )
}

export default Nature