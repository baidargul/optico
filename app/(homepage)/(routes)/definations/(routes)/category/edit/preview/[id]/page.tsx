import React from 'react'

type Props = {
  params: any
}

const page = (props: Props) => {
  const id = props.params.id
  return (
    <div> {id} Controls Preview Page</div>
  )
}

export default page