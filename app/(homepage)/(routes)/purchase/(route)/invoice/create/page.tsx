import { Separator } from '@/components/ui/separator'
import React from 'react'
import VendorSelect from './components/vendor/VendorSelect'
import TermsSelect from './components/TermsSelect'
import OrderDetails from './components/OrderDetails'
import Grid from './components/Grid/Grid'
import { Button } from '@/components/ui/button'

type Props = {}

const page = (props: Props) => {
  return (
    <div className=''>
      <div>
        <div className='text-2xl text-site-mainText font-semibold mb-2 flex gap-1 justify-between items-center'>
          <div>
            Purchase Order
          </div>
          <div className='p-2 flex gap-2 items-center'>
            <Button className='bg-site-mainText text-white w-28'>New</Button>
            <Button className='bg-site-mainText text-white w-28'>Save</Button>
            <Button className='bg-site-mainText text-white w-28'>Print</Button>
          </div>
        </div>
        <Separator />
        <div className='py-4 flex justify-between items-start text-sm'>
          <VendorSelect />
          <TermsSelect />
          <OrderDetails />
        </div>
        <Separator />
        <Grid />
      </div>
    </div>
  )
}

export default page