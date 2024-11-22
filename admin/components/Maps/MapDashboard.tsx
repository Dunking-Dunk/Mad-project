'use client'

import React from 'react'
import Map from './Map'
import StopMarker from './StopMark'
import { Polyline } from '@react-google-maps/api'
import { useAppSelector } from '@/store/store'

type Props = {
    buses: Bus[]
}

const MapBus = () => {
    const {buses} = useAppSelector((state) => state.Bus)
    return (
        <Map zoom={13} >
            {buses.map((bus: any) => {
                const stop = bus.stops[0]
                const stopLast = bus.stops[bus.stops.length - 1]
                const stopCoord = stop.location.coordinate
                const stopLastCoord = stopLast.location.coordinate

                if (bus.stops) {
                    return (
                        <>
                            <StopMarker position={{ lat: stopCoord[1], lng: stopCoord[0] }} type={2} stop={stop} size={stop.busId.length} />
                            <StopMarker position={{ lat: stopLastCoord[1], lng: stopLastCoord[0] }} type={2} stop={stopLast} size={stopLast.busId.length} />
                            <Polyline path={[{ lat: stopCoord[1], lng: stopCoord[0] }, { lat: stopLastCoord[1], lng: stopLastCoord[0] }]}  options={{
                    strokeColor: (stop.busId.length >=3 || stopLast.busId.length >=3) ? '#FF5C00': '#279EFF',
                    strokeOpacity: 1,
                    strokeWeight: 2 * (bus.stops[0].busId.length * 0.5),
            }}/>
                        </>
                        
                    )
                }
            })}
        </Map>
    )
}

export default MapBus