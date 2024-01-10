import { formalizeText } from '@/lib/my'
import { EditIcon } from 'lucide-react'
import React from 'react'
import CategoryName from './Title/CategoryName'

type Props = {
    category: any
}

const Title = (props: Props) => {
    const category = props.category
    return (
        <div className="flex gap-2 items-center group">
            <CategoryName category={category}/>
            <div>
                in
            </div>
            <div className="p-1 bg-zinc-200 border border-zinc-300 rounded first-letter:font-semibold text-xs">
                {
                    formalizeText(category.nature.name)
                }
            </div>
        </div>
    )
}

export default Title