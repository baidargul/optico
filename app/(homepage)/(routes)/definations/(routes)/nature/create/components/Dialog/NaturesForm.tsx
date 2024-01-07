import React from 'react'
import Form from './NatureForm/Form'

type Props = {
  fetch:any
}

const NaturesForm = (props: Props) => {
  return (
    <div className=''>
        <div className='font-sans font-semibold text-sm py-1 border-b border-dashed border-site-mainText/40 mb-2'>
            Create new:
        </div>
        <div>
            <Form fetch={props.fetch}/>
        </div>
    </div>
  )
}

export default NaturesForm