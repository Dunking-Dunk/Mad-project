import React from "react";
import StopMarker from "../marker/Marker";
import GoogleMapReact from "google-map-react";

const Marker = () => {
    return <div style={{ position: 'relative', top: -300 }}>
        <img src='RECFlagFlagMain.gif' style={{
            position: 'absolute'
        }} />
        <img src='pole1.png' style={{
            position: 'absolute'
        }} />
    </div>


}

const MapView = ({ allStops, addStops }) => {
    return (<div style={{ height: '100%', width: '100%', marginBottom: '20px' }}>
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={{
        lat: 13.078339,
        lng: 80.180592
        }} zoom={11} >
            {allStops && allStops.map((stop) => {
                return (
                    <StopMarker key={stop.id} stop={stop} lat={stop.coords.latitude} lng={stop.coords.longitude}  onClick={ addStops } />
            )
            })}
            <Marker lat={ 13.009577} lng={80.00433 }  />
    </GoogleMapReact> */}

    </div>)
}

export default MapView