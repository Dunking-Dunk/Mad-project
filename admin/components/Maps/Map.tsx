'use client'

import React, {memo,useRef,useState} from "react";

import { useTheme } from "next-themes";
import {darkMap} from '@/lib/mapTheme'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Loader from '../Loader'

const libraries = ["places"]

const MapView = (props: any) => {
    const mapRef = useRef(null);
    const { theme } = useTheme()
    const styles = theme === 'dark' ? darkMap : []
    const [position, setPosition] = useState({
        lat: 13.078339, 
        lng: 80.180592
    });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyACWjzUJ1XziqSuWycOTNorOmfe2swDIc',
        libraries
    }) 

    function handleLoad(map:any) {
        mapRef.current = map;
      }
    
      function handleCenter() {
        if (!mapRef.current) return;
    
        const newPos = mapRef.current.getCenter().toJSON();
        setPosition(newPos);
      }

    return (
        <div className="w-full h-full rounded-xl overflow-hidden">
            {isLoaded ? (
                 <GoogleMap 
                    zoom={15}
                 options={{
                     styles
                    }}
                    onDragEnd={handleCenter}
                    onLoad={handleLoad}
                 center={position}
                 mapContainerClassName="map-container" 
                 {...props}
                          
             >
                 {props.children}
         </GoogleMap>): <div className='w-full h-full flex items-center justify-center'><Loader/></div>
                     }
           
        </div>
    )
}

export default memo(MapView)