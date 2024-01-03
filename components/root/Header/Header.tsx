import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='bg-gradient-to-b from-zinc-100 to-zinc-300 p-4'>
        <div className='p-2 font-semibold text-2xl text-site-mainText'>
            Test Application
        </div>
    </div>
  )
}

export default Header