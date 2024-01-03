import Image from 'next/image'
import React from 'react'
import LogoTitle from './components/LogoTitle'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='bg-gradient-to-b from-zinc-100 to-zinc-300 p-4'>
            <div className='flex justify-between items-center'>
                <div>
                    <LogoTitle />
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Header