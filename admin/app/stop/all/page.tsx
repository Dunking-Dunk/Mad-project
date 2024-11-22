'use client'

import React from 'react'
import { DataTable } from '@/components/Data-table'
import { stopColumn } from '@/lib/columnTable'
import { useAppSelector } from '@/store/store'

const Stop =  () => {
    const stops = useAppSelector((state) => state.Stop.stops)

    return (
        <div>
            <h1>Stops</h1>
            <DataTable columns={stopColumn} data={stops} filterColumn='address'/>
        </div>
    )
}

export default Stop