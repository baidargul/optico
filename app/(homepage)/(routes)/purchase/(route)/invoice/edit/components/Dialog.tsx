import React from 'react'
import Product from './components/Product'

type Props = {}

const Dialog = (props: Props) => {
    return (
        <div>
            <div className='text-2xl text-site-mainText font-semibold mb-5 flex gap-1 items-center'>
                <div>
                    Purchase
                </div>
            </div>
            <div className='flex gap-2 justify-between'>
                <div className='bg-white p-2 w-[30%] rounded border border-slate-200/50 drop-shadow-sm'>
                    {/* <ListOfAvailableNatures natures={availableNatures} fetch={fetchNatures} /> */}
                </div>
                <div className='bg-white p-2 w-[70%] h-fit rounded border border-slate-200/50 drop-shadow-sm'>
                    <Product />
                    {/* <NaturesForm fetch={fetchNatures} /> */}
                </div>
            </div>
        </div>
    )
}

export default Dialog