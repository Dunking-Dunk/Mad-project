'use client'

import React, { useEffect } from 'react'
import Map from './Map'

import { useAppSelector } from '@/store/store'
import BusMarker from './BusMarker'
import { CardDescription } from '../ui/card'
import { clientSocket } from '@/api/socket'

type Props = {
    stops?: Stop[]
    busPoly?: any
}

const MapBuses = ({ }: Props) => {
    const { trackers } = useAppSelector((state) => state.Tracker)

    return (
        <Map zoom={12}>
            {
                trackers.map((tracker, index) => {
                    const coords = tracker.coords
                    if (coords)
                        return (<BusMarker position={{ lat: coords[1], lng: coords[0] }} bus={tracker} key={index} />)
                })
            }
            <div className='absolute bottom-10 left-1/2 -translate-x-1/2 bg-primary py-2 px-4 rounded-2xl flex flex-row space-x-6 items-center'>
                <div className='flex flex-col'>
                    <CardDescription>Total Buses</CardDescription>
                    <h5 className='text-secondary font-bold text-lg'>{trackers.length}</h5>
                </div>
                <div className='flex flex-col'>
                    <CardDescription>Total active buses</CardDescription>
                    <h5 className='text-secondary font-bold text-lg'>1</h5>
                </div>
                <div className='flex flex-col'>
                    <CardDescription>Total Bus for service</CardDescription>
                    <h5 className='text-secondary font-bold text-lg'>10</h5>
                </div>
            </div>
        </Map>
    )
}

export default MapBuses