import React from 'react'

type Props = {
    icon: any
    onClick: () => void
}

const Button = (props: Props) => {
    return (
        <div onClick={props.onClick} className='bg-site-colors-secondary/45 hover:bg-site-colors-secondary p-1 rounded cursor-pointer'>
            <props.icon className='w-6 h-6 text-white transition-all duration-1000' />
        </div>
    )
}

export default Button