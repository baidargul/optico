import Image from 'next/image'
import React from 'react'

type Props = {}

const LogoTitle = (props: Props) => {
    return (
        <div className='flex items-center group cursor-pointer w-fit'>
            <div className='rounded-full border-4 border-zinc-500/20 bg-zinc-300 transition-all duration-1000 group-hover:border-yellow-600/30 group-hover:bg-yellow-50'>
                <Image src={"/Header/Logo/siteLogo.png"} alt='website-logo' width={80} height={80} draggable={false} className='pointer-events-none' />
            </div>
            <div className='p-2 w-fit'>
                <div className='font-semibold text-2xl text-site-mainText group-hover:tracking-wide duration-1000 transition-all'>
                    Optico
                </div>
                <div className='text-sm w-[60%] scale-90 -ml-1 -my-1 group-hover:tracking-tight transition-all duration-1000'>
                    Retail Solution for eye wear business.
                </div>
            </div>
        </div>
    )
}

export default LogoTitle