import './busView.scss'
import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getBus } from '../../store/actions/action';
import { useParams } from 'react-router-dom';
import MapView from '../../components/map/MapView';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const BusView = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const bus = useSelector((state) => state.buses.bus)

    useEffect(() => {
        dispatch(getBus(params.id, true))
    }, [])
 
    if (bus) {
        return (
            <div className='busview__container'>
                <h1 className='busview__container__title'>Bus Detail</h1>
                <div className='busView__detail__container'>
                    <h4>Route Name: </h4>
                <h1 className='detail__container__value'>{bus.busName}</h1>
                </div>
                <div className='busView__detail__container'>
                    <h4>Route: </h4>
                    <h1  className='detail__container__value'>{bus.busNumber} {bus.busSet}</h1>
                </div>
                <div className='busView__detail__container'>
                    <h4>Origin: </h4>
                    <h2  className='detail__container__value'>{bus.origin}</h2>
                </div>
                <div className='busView__detail__container'>
                    <h4>Morning Time: </h4>
                    {bus.stops &&  <h2>{bus.stops[0]?.timing} am</h2>}
                </div>
                <div className='busView__detail__container'>
                    <h4>Depature Time: </h4>
                    <h2  className='detail__container__value'> {bus.returnAfter315 ? '3:15' : bus.returnAfter1 ? '1:00' : '5:00'} pm</h2>
                </div>
                <div className='busView__detail__container' style={{
                    height: '700px'}}>
                    <h4>All Stops: </h4>
                    {bus.stops && (
                        <>
                             <MapView addStops={() => { }} allStops={bus.stops} />
                        <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                        }}
                        component="ul">
                        {bus.stops.map((stop, index) => {
                            return (
                                <div className='chip__container' key={stop.id}>
                                    <h5>{index + 1}</h5>
                                               <Chip
                                        label={stop.name}
                              />
                                </div>
                     
                            )
                        })} 
                            </Paper>
                        </>
                       
                    )
                    }
                    
                </div>
                <div className='busView__detail__container'>
                    <h4>Description: </h4>
                    <h2  className='detail__container__value'>{bus.description}</h2>
                </div>
                <div className='busView__detail__container'>
                    <h4>Total Seats:</h4>
                    <h2  className='detail__container__value'>{bus.seats}</h2>
                </div>
                <div className='busView__detail__container'>
                    <h4>AC: </h4>
                    <h2  className='detail__container__value'>{bus.ac ? 'AC' : 'Non AC'}</h2>
                </div>
            </div>
        )
    } else {
        return '...loading'
    }
   
}

export default BusView
