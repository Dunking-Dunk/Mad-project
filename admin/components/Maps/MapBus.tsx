'use client'

import React, { useEffect } from 'react'
import Map from './Map'
import StopMarker from './StopMark'
import { Polyline } from '@react-google-maps/api'
import { useAppSelector } from '@/store/store'
import { clientSocket } from '@/api/socket'
import BusMarker from './BusMarker'


type Props = {
    stops: Stop[]
    busPoly?: any,
    id: string
}

const MapBus = ({ stops, busPoly, id }: Props) => {
    const { trackers } = useAppSelector((state) => state.Tracker)
    const tracker = trackers.find(tracker => tracker.bus === id)

    const polyLine = busPoly.map((poly: any) => ({ lat: poly[0], lng: poly[1] }))

    return (
        <Map zoom={15} >
            {stops.map((stop, index) => {
                return (<StopMarker position={{ lat: stop.location.coordinate[1], lng: stop.location.coordinate[0] }} key={index} stop={stop} type={2}></StopMarker>)
            })}
            {
                busPoly && <Polyline
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
    )
}

export default MapBus