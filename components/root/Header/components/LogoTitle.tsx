import Image from 'next/image'
import React from 'react'

type Props = {}

const LogoTitle = (props: Props) => {
    return (
        <div className='flex items-center'>
            <div className='rounded-full border-4 border-zinc-500/20 bg-zinc-300'>
                <Image src={"/Header/Logo/siteLogo.png"} alt='website-logo' width={80} height={80} draggable={false} className='pointer-events-none' />
            </div>
            <div className='p-2'>
                <div className='font-semibold text-2xl text-site-mainText'>
                    Optico
                </div>
                <div className='text-sm w-[60%] scale-90 -ml-1 -my-1'>
                    Retail Solution for eye wear business.
                </div>
            </div>
        </div>
    )
}

export default LogoTitle