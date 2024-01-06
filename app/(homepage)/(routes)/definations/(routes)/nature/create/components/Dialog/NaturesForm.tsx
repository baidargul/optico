import React from 'react'
import Form from './NatureForm/Form'

type Props = {}

const NaturesForm = (props: Props) => {
  return (
    <div className=''>
        <div className='font-sans font-semibold text-sm p-1 border-b border-dashed border-site-mainText/40 mb-2'>
            Create new:
        </div>
        <div>
            <Form/>
        </div>
    </div>
  )
}

export default NaturesForm