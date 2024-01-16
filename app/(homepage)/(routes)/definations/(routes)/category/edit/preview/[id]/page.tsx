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
    <div>
      
    </div>
  )
}

export default page