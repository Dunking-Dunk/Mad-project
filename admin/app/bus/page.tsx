import React from 'react'
import MapBuses from '@/components/Maps/MapBuses'

export default function Bus() {

  return (
<div className='flex flex-col space-y-4 h-[calc(100vh-250px)] '>
      <div className='h-full w-full relative'>
          <MapBuses/>
        </div>
      </div>
    )
  }