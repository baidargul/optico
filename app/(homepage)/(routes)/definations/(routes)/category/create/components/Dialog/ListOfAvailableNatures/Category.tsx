'use client'
import { category } from '@prisma/client'
import React, { useState } from 'react'
import ArchiveController from './Category/ArchiveController'
import { formalizeText } from '@/lib/my'
import DeleteController from './Category/DeleteController'
type Props = {
    category: category
    fetch: any
}

const Category = (props: Props) => {
    const [category, setCategory] = useState(props.category)

    return (
        category && <div className='py-1 border-b hover:bg-zinc-100/50 flex justify-between items-center'>
            <div className=''>
                {formalizeText(category.name)}
            </div>
            <div className='grid grid-cols-2 gap-1 items-center'>
                <div>
                    <ArchiveController category={category} setNature={setCategory} />
                </div>
                <div>
                    <DeleteController category={category} fetch={props.fetch} />
                </div>
            </div>
        </div>
    )
}

export default Category