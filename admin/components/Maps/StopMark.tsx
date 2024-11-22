'use client'

import React, {useState} from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api'
import { useTheme } from 'next-themes'

// type Props = {
//     stop: any,
//     children: React.ReactNode,
 
// }
const StopMarker = (props: any) => {
    const { theme } = useTheme()
    const stop = props.stop
      const [isOpen, setIsOpen] = useState<string|null>(null);

    const svgMarker1 = {
        path: 'M3 0C1.34 0 0 1.34 0 3C0 5 3 8 3 8C3 8 6 5 6 3C6 1.34 4.66 0 3 0ZM3 1C3.53043 1 4.03914 1.21071 4.41421 1.58579C4.78929 1.96086 5 2.46957 5 3C5 4.11 4.11 5 3 5C2.46957 5 1.96086 4.78929 1.58579 4.41421C1.21071 4.03914 1 3.53043 1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1Z',
        fillColor: '#E55604',
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        anchor: new google.maps.Point(0, 8),
        scale: 5,
        size: new google.maps.Size(20, 32),
    }
    
    const svgMarker2 = {
            path: 'M16 30C13.2311 30 10.5243 29.1789 8.22202 27.6406C5.91973 26.1022 4.12531 23.9157 3.06569 21.3576C2.00606 18.7994 1.72881 15.9845 2.26901 13.2687C2.8092 10.553 4.14257 8.05844 6.10051 6.1005C8.05844 4.14257 10.553 2.8092 13.2687 2.269C15.9845 1.72881 18.7994 2.00606 21.3576 3.06569C23.9157 4.12531 26.1022 5.91973 27.6406 8.22201C29.1789 10.5243 30 13.2311 30 16C29.9958 19.7117 28.5194 23.2702 25.8948 25.8948C23.2702 28.5194 19.7117 29.9958 16 30ZM16 4C13.6266 4 11.3065 4.70379 9.33316 6.02236C7.35977 7.34094 5.8217 9.21508 4.91345 11.4078C4.00519 13.6005 3.76755 16.0133 4.23058 18.3411C4.6936 20.6689 5.83649 22.807 7.51472 24.4853C9.19295 26.1635 11.3311 27.3064 13.6589 27.7694C15.9867 28.2324 18.3995 27.9948 20.5922 27.0866C22.7849 26.1783 24.6591 24.6402 25.9776 22.6668C27.2962 20.6935 28 18.3734 28 16C27.9963 12.8185 26.7308 9.76844 24.4812 7.51881C22.2316 5.26918 19.1815 4.0037 16 4Z M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z',
            fillColor: props.size >= 3 ? '#FF5C00':  props.size ? '#279EFF': '#FF5C00',
            fillOpacity: 1,
            strokeWeight: 0,
            rotation: 0,
            anchor: new google.maps.Point(10, 18),
            scale:  props.size  ? 1 * (props.size * 0.5) : 0.8,
            size: new google.maps.Size(20, 32),
        }

    const Icon = () => {
        let icon;
        switch (props.type) {
            case 1:
                icon = svgMarker1
                break
            case 2:
                icon = svgMarker2
                break 
        }
        return icon
    }

    return (
        <Marker {...props} onMouseOver={() => {
            if (stop)
      setIsOpen(stop.id)
        }} onMouseOut={() => {
            if (stop)
      setIsOpen(null)
  }} icon={Icon()}>
     
            {isOpen && stop &&
                             <InfoWindow>
                    <div className='flex flex-col gap-y-1 w-full h-full rounded-sm '>
                        <h3 className='text-black font-bold text-lg'>Stop:</h3>
                                 <h3 className='text-black'>{stop.name}</h3>
                        <p className='text-black'>{stop.address}</p>
                        {props.children && props.children}
                             </div>
                         </InfoWindow>
                        }
          
      </Marker>)
}

export default StopMarker