import PreviewMultipleSelection from "@/components/PreviewControls/PreviewMultipleSelection"
import PreviewSingleSelection from "@/components/PreviewControls/PreviewSingleSelection"
import PreviewTextBox from "@/components/PreviewControls/PreviewTextBox"
import prisma from "@/lib/prisma"
import React from 'react'

type Props = {
  params: any
}

const page = async (props: Props) => {
  const id = props.params.id

  const category = await prisma.category.findUnique({
    include: {
      nature: true,
      properties: {
        include: {
          default: true,
          propertyOptions: {
            orderBy: {
              index: 'asc'
            }
          }
        },
        orderBy: {
          index: 'asc'
        }
      },
    },
    where: {
      id: id
    }
  })

  return (
    <div className="grid grid-cols-2 gap-1">
      {
        category?.properties.map((property) => {

          return (
            <div key={property.id} className="text-sm my-1 bg-site-colors-primary/10 border border-site-colors-primary/40 p-1 rounded h-fit">
              <PreviewTextBox property={property} />
              <PreviewSingleSelection property={property} />
              <PreviewMultipleSelection property={property} />
            </div>
          )
        })
      }
    </div>
  )
}

export default page