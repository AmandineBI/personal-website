'use client'
import { cn } from '@/utilities/ui'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

type Props = {
  title: string
}

export const StarsBlock: React.FC<Props> = ({ title }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="mx-auto my-0 w-full h-screen bg-red-700">
        <p>HELLO WORLD</p>
        <p>{title}</p>
      </div>
    </div>
  )
}
