'use client'

import React from 'react'
import { DataTable } from '@/components/Data-table'
import { busColumns } from '@/lib/columnTable'
import { useAppSelector } from '@/store/store'

export default function Buses() {
    const buses = useAppSelector((state: any) => state.Bus.buses)

  return (
<div className='flex flex-col space-y-4'>
      <h1 className='font-medium text-xl'>All Buses</h1>
     <DataTable columns={busColumns} data={buses} filterColumn='busName' />
      </div>
    )
  }