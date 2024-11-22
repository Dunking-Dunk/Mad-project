import React from 'react'

import Map from '@/components/Maps/MapStops'

const Stop =  () => {
    return (
        <div className='w-full h-[calc(100vh-250px)] '>
          <div className='w-full h-full'>
            <Map/>
            </div>
        </div>
    )
}

export default Stop