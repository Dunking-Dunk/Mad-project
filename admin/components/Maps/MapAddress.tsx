'use client'

import React, {memo, useEffect, useState, useRef} from "react";

import { Marker } from '@react-google-maps/api';
import Map from './Map'
  
const MapMarker = ({ setAddress, getCoord }: {
  setAddress: any,
  getCoord: any,
}) => {
  const mapRef= useRef()
  const [coords, setCoords ]  = useState({lat: 13.078339,lng:80.180592 })

  useEffect(() => {
    getCoord(coords)
    let service = new google.maps.Geocoder();
    const helper = async () => {

    const res = await service.geocode({ location: coords })

      setAddress({address: res.results[0].formatted_address , placeId: res.results[0].place_id})
    }    
      helper()
  },[coords])

  const handleClick = async (e: any) => {
    if (e.latLng) {
      setCoords((state) => ({ ...state, lat: e.latLng.lat(), lng: e.latLng.lng() }))
    }
  }

  async function onLoad(map: any) {
    map.current = map
  }

    return (
        <Map 
                onClick={handleClick}
                onLoad={(map:any) => onLoad(map)}
        >
          <Marker position={coords}/>
         
        </Map>
    )
}

export default MapMarker