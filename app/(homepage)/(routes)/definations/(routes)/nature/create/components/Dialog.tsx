import React from 'react'
import ListOfAvailableNatures from './Dialog/ListOfAvailableNatures'

type Props = {}

const Dialog = (props: Props) => {
    return (
        <div>
            <div className='text-2xl font-sans mb-10'>Create Product Nature</div>
            <div className='flex gap-2 justify-between'>
                <div className='bg-white p-2 w-[30%] rounded border border-slate-200/50 drop-shadow-sm'>
                    <ListOfAvailableNatures />  
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Dialog