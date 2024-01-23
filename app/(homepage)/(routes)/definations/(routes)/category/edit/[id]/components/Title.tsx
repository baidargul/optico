import { formalizeText } from '@/lib/my'
import React from 'react'
import CategoryName from './Title/CategoryName'
import TitleButtons from './TitleButtons/TitleButton'

type Props = {
    category: any
}

const Title = (props: Props) => {
    const category = props.category

    console.log(category)
    return (
        <div className='flex justify-between items-center'>
            <div className="flex gap-2 items-center group">
                <CategoryName category={category} />
                <div>
                    in
                </div>
                <div className={`p-1 bg-zinc-200 border border-zinc-300 rounded text-xs ${category.nature.dynamic && "first-letter:font-semibold"}`}>
                    {
                        formalizeText(category.nature.name)
                    }
                </div>
            </div>
            <div>
                <TitleButtons category={category} />
            </div>
        </div>

    )
}

export default Title