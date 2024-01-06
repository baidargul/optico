import React from 'react'
import ListOfAvailableNatures from './Dialog/ListOfAvailableNatures'
import { Dna } from 'lucide-react'
import NaturesForm from './Dialog/NaturesForm'

type Props = {}

const Dialog = (props: Props) => {
    return (
        <div>
            <div className='text-2xl text-site-mainText font-semibold mb-5 flex gap-1 items-center'>
                <div>
                    Nature definitions
                </div>
            </div>
            <div className='flex gap-2 justify-between'>
                <div className='bg-white p-2 w-[30%] rounded border border-slate-200/50 drop-shadow-sm'>
                    <ListOfAvailableNatures />
                </div>
                <div className='bg-white p-2 w-[70%] rounded border border-slate-200/50 drop-shadow-sm'>
                    <NaturesForm/>
                </div>
            </div>
        </div>
    )
}

export default Dialog