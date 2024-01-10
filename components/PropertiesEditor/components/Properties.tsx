import React from 'react'
import Property from './Properties/Property'

type Props = {
    category: any
}

const Properties = (props: Props) => {
    return (
        <div className='grid grid-cols-3 gap-2'>
            <Property id='1'/>
            <Property id='1'/>
            <Property id='1'/>
        </div>
    )
}

export default Properties