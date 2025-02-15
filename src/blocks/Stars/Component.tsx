import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  title: string
}

export const StarsBlock: React.FC<Props> = ({ title }) => {
  return (
    <div className="mx-auto my-8 w-full bg-red-700 h-56">
      <span>HELLO WORLD</span>
      <span>{title}</span>
    </div>
  )
}
