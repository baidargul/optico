import React from 'react'

type Props = {}

const Row = (props: Props) => {
    return (
        <div className='bg-white hover:bg-green-50 grid grid-cols-8 justify-items-start gap-1 w-full rounded border font-sans'>
            <div className='mr-auto pl-2'>
                #1
            </div>
            <div>
                Rayban 002
            </div>
            <div>
                Sunglass
            </div>
            <div>
                Gradient
            </div>
            <div className='select-text selection:bg-yellow-50 bg-transparent'>
                932842394348534
            </div>
            <div>
                Rs 290
            </div>
            <div>
                Rs 800
            </div>
            <div className='ml-auto pr-2'>
                Edit
            </div>
        </div>
    )
}

export default Row