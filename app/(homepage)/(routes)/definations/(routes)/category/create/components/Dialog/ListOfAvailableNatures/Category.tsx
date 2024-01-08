'use client'

import React, { useState } from 'react'
import ArchiveController from './Category/ArchiveController'
import { formalizeText } from '@/lib/my'
import DeleteController from './Category/DeleteController'
import { category } from '@prisma/client'
type Props = {
    category: any
    fetch: any
}

const Category = (props: Props) => {
    const [category, setCategory] = useState(props.category)

    return (
        category && <div className='py-1 border-b hover:bg-zinc-100/50 flex justify-between items-center'>
            <div className='w-32 truncate'>
                {formalizeText(category.name)}
            </div>
            <div className={`text-xs bg-zinc-100 p-1 rounded-sm border border-zinc-200 w-20 text-center truncate ${category.nature.dynamic && "first-letter:font-bold"}`}>
                {formalizeText(category.nature.name)}
            </div>
            <div className='grid grid-cols-2 gap-1 items-center'>
                <div>
                    <ArchiveController category={category} setCategory={setCategory} />
                </div>
                <div>
                    <DeleteController category={category} fetch={props.fetch} />
                </div>
            </div>
        </div>
    )
}

export default Category