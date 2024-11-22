import React from 'react'
import BusForm from '@/components/BusForm'

const New = async () => {
    
    return (
        <div className='flex flex-col space-y-4 mb-16'>
            <h1 className='text-3xl capitalize font-bold'>Create a new bus</h1>
            <BusForm />
        </div>
    )
}

export default New