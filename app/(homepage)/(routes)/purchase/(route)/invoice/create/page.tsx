'use client'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import VendorSelect from './components/vendor/VendorSelect'
import TermsSelect from './components/TermsSelect'
import OrderDetails from './components/OrderDetails'
import Grid from './components/Grid/Grid'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import ControlBox from './components/ControlBox'

type Props = {}

const page = (props: Props) => {

  const handleSavePurchaseOrder = async () => {
    const data = {
      dateOfPurchase: new Date(),
      accountId: 1,
      freight: 0,
      paid: 0,
    }

    try {
      await axios.post(`/api/purchase/invoice/create`, data).then(async (res) => {
        const response = await res.data
        if (response.status === 200) {
          toast.success(response.message)
        } else {
          toast.warning(response.message)
        }
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }


  return (
    <div className=''>
      <div>
        <div className='text-2xl text-site-mainText font-semibold mb-2 flex gap-1 justify-between items-center'>
          <div>
            Purchase Order
          </div>
          <div className='p-2 flex gap-2 items-center'>
            <Button className='bg-site-mainText text-white w-28'>New</Button>
            <Button onClick={handleSavePurchaseOrder} className='bg-site-mainText text-white w-28'>Save</Button>
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
        <ControlBox />
        <Separator />
        <Grid />
      </div>
    </div>
  )
}

export default page