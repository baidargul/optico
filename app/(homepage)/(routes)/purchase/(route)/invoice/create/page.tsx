import { Separator } from '@/components/ui/separator'
import React from 'react'
import VendorSelect from './components/vendor/VendorSelect'
import TermsSelect from './components/TermsSelect'
import OrderDetails from './components/OrderDetails'
import Grid from './components/Grid/Grid'

type Props = {}

const page = (props: Props) => {
  return (
    <div className=''>
      <div>
        <div className='text-2xl text-site-mainText font-semibold mb-5 flex gap-1 items-center'>
          Purchase Order
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