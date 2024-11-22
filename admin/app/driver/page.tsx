"use client"

import React from 'react'
import { DataTable } from '@/components/Data-table'
import { driverColumns } from '@/lib/columnTable'
import { useAppSelector } from '@/store/store'

const Driver = () => {
  const drivers = useAppSelector((state) => state.Driver.drivers)

  return (
    <div className='flex flex-col space-y-4'>
      <h1 className='font-medium text-xl'>All Drivers</h1>
      <DataTable columns={driverColumns} data={drivers}  />
    </div>

  )
}

export default Driver