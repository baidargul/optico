'use client'
import React from 'react'

type Props = {
    id: string // Category Property Id
}

const Property = (props: Props) => {

    const handleDeletePropertyClick = async () => {

    }

    return (
        <div className='relative w-full bg-gradient-to-r from-zinc-50 to-zinc-50 h-20 rounded border border-zinc-200/80'>
            <div onClick={handleDeletePropertyClick} className='absolute right-0 hover:bg-site-colors-secondary bg-site-colors-secondary/40 text-center text-white w-6 h-6 scale-75 text-xs p-1 rounded-md'>
                x
            </div>
        </div>
    )
}

export default Property