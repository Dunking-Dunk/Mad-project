'use client'

import React, { useEffect, useState } from 'react'
import Map from './Map'
import StopMarker from './StopMark'
import { Polyline } from '@react-google-maps/api'
import { useAppSelector } from '@/store/store'
import { clientSocket } from '@/api/socket'
import BusMarker from './BusMarker'
import axios from '@/api/axios'
import { Button } from '../ui/button'


type Props = {
    stops?: Stop[]
    id: string
}

const MapBusBackTracking = ({ stops, id }: Props) => {
    const { trackers } = useAppSelector((state) => state.Tracker)
    const tracker = trackers.find(tracker => tracker.bus === id)
    const [polyLine, setPolyline] = useState([])
    const [days, setDays] = useState(1)

    useEffect(() => {
        const helper = async () => {
            const res = await axios.get(`/data/backtrack/${id}?days=${days}`)
            const data = res.data
            const polyLine = data.map((poly: any) => ({ lat: poly.location.coordinate[0], lng: poly.location.coordinate[1] }))

            setPolyline(polyLine)
        }
        helper()
    }, [days])

    return (
        <>
            <Map zoom={15} >
                {
                    polyLine && <Polyline
                        path={polyLine}
                        options={{
                            strokeColor: '#F94C10',
                            strokeOpacity: 1,
                            strokeWeight: 3,
                        }}
                    />
                }
                {
                    tracker && <BusMarker position={{ lat: tracker.coords[1], lng: tracker.coords[0] }} />
                }
            </Map>
            <div className='absolute bottom-10 left-1/2 -translate-x-1/2 bg-primary rounded-2xl flex flex-row items-center'>
                <Button onClick={() => {
                    setDays(1)
                }}>yesterday</Button>
                <Button onClick={() => {
                    setDays(2)
                }}>2 days ago</Button>
                <Button onClick={() => {
                    setDays(7)
                }}>week ago</Button>
            </div >
        </>

    )
}

export default MapBusBackTracking 