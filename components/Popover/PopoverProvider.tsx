import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import React from 'react'

type Props = {
  children: React.ReactNode
  content: React.ReactNode
  open?: boolean
}

const PopoverProvider = (props: Props) => {
  return (
    <Popover open={props.open ? props.open : false}>
      <PopoverTrigger className="ring-0 outline-none">
        {props.children}
      </PopoverTrigger>
      < PopoverContent className="w-full" collisionPadding={10}>
        {props.content}
      </PopoverContent>
    </Popover>

  )
}

export default PopoverProvider