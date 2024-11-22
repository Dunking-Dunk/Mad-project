import './busNew.scss'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { createBus, updateBus } from '../../store/actions/action'
import MapView from '../../components/map/MapView'

const BusNew = ({update}) => {
    const allStops = useSelector((state) => state.stops.stops)
    const allTracker = useSelector((state) => state.buses.trackers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const editBus = useSelector((state) => state.buses.bus)

    const [state, setState] = useState({
            busNumber: 0,
            busSet: '',
            busName: '',
            description: '',
            origin: '',
            stops: [],
            morningToCollege: true,
            returnAfter315: true,
            returnAfter1: false,
            returnAfter5: false,
            seats: 0,
            status: true,
            ac: true,
            tracker: '',
    })

    const [selectedStops, setSelectedStops] = useState(update ? editBus.stops : [])
        
    useEffect(() => {
        if (update)setState(editBus)
        
    }, [editBus])
    
    function handleSubmit(e) {
        e.preventDefault()
        if (state.busNumber && state.busSet.length === 1 && state.busName.length > 3 && state.description.length > 5 && state.origin.length > 3 && state.stops.length >= 1) {
            if (update) {
                dispatch(updateBus(params.busId, state))
            } else {
                
                dispatch(createBus(state))
            }
            navigate('/bus')
        }
     
    } 

    
    function updateState(data) {
        setState((state) => ({ ...state, ...data }))
    }
    function addStops(stop) {
            if (update)
                updateState({ stops: [...state.stops, stop] })
            else
            if (state.stops.indexOf(stop.id) === -1) {
            updateState({ stops: [...state.stops, stop.id] })
            setSelectedStops([...selectedStops, stop])
        }
    }

    function handleDelete(stop) {
        if (update)
            updateState({ stops: state.stops.filter((data) => data.id !== stop.id) })
        else
            updateState({ stops: state.stops.filter((data) => data !== stop.id) })
        setSelectedStops(selectedStops.filter((data) => data.id !== stop.id)) 
    }
  
   
        return (
            <div className='newbus'>
                <h1 className='title'>{update ? 'UPDATE BUS':  'CREATE NEW BUS'}</h1>
                <form className='newbus__container' onSubmit={handleSubmit} >
                    <div className='formInput'>
                        <h5>Route Name: </h5>
                        <input type='text' value={state.busName} onChange={(e) => {
                            updateState({ busName: e.target.value })
                        }} required/>
                    </div>
                    <div className='formInput'>
                        <h5>Route Number: </h5>
                        <input type='number' onChange={(e) => {
                            updateState({busNumber: e.target.value})
                        }}  min='0' placeholder='only single digit' value={state.busNumber} required/>
                    </div>
                    <div className='formInput'>
                        <h5>Route Set: </h5>
                        <input type='text' value={state.busSet} onChange={(e) => {
                            updateState({ busSet: e.target.value })
                        }} placeholder='only one word' required/>
                    </div>
                    <div className='formInput'>
                        <h5>Route Origin:</h5>
                        <input type='text' value={state.origin} onChange={(e) => {
                            updateState({origin: e.target.value})
                        }} placeholder='location name of origin' required/>
                    </div>
                    <div className='formInput'>
                        <h5>Route Description:</h5>
                        <textarea type='text' value={state.description} onChange={(e) => {
                            updateState({description: e.target.value})
                        }} required/>
                           </div>
                                     <div className='formInput' style={{height: '600px', marginBottom: '110px'}}>
                        <h5>Stops:</h5>
                            <MapView allStops={allStops} addStops={addStops} />
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
                        {selectedStops && selectedStops.map((stop, index) => {
                            return (
                                <div className='chip__container' key={stop.id}>
                                    <h5>{index + 1}</h5>
                                               <Chip
                                        label={stop.name}
                                     
                                onDelete={() => handleDelete(stop)}
                              />
                                </div>
                     
                            )
                        })} 
                            </Paper>
                    </div>
                 
                    <div className='formInput'>
                        <h5>GPS TRACKER</h5>
                        {state.tracker && <h5>Tracker Selected: <strong>{state.tracker}</strong></h5>}
                        {allTracker && (
                            <div className='tracker'>
                                {allTracker.map((tracker) => {
                                    return (
                                        <div className='tracker__container' key={tracker.id} onClick={() => {
                                            updateState({tracker: tracker.id})
                                        }}>
                                            <h5>Id: {tracker.id}</h5>
                                            <h5>GPS ID: {tracker.gpsId}</h5>
                                            {tracker.onBusRoute && <h5>on bus: {tracker.onBusRoute}</h5>}
                                            {tracker.bus && <h5>connected to bus: {tracker.bus}</h5>}
                                        </div>
                                    )
                                })}
                            </div>
                        ) }
                    </div>
                    <div className='formInput'>
                        <h5>Bus Capacity:</h5>
                        <input type='number' min='0'  onChange={(e) => {
                            updateState({ seats: e.target.value })
                           
                        }} placeholder='bus total seats'  value={state.seats} required/>
                    </div>
                    <div className='formInput'>
                        <h5>Status:</h5>
                        <Switch
                            checked={state.status}
                            onClick={() => {          
                                setState((data) => ({...data,status: !state.status}))
                            }}
      inputProps={{ 'aria-label': 'controlled' }}
    />
                    </div>
                    <div className='formInput'>
                        <h5>Bus Morning to college:</h5>
                        <Switch
      checked={state.morningToCollege}
      onClick={() => {
        updateState({ morningToCollege: !state.morningToCollege})
                            }}
    
      inputProps={{ 'aria-label': 'controlled' }}
    />
                    </div>
                    <h4 style={{marginBottom: '10px'}}>Only one should be selected</h4>
                    <div className='formInput'>
                        <h5>Bus Depature 1 pm:</h5>
                        <Switch
                            checked={state.returnAfter1}
                            onClick={() => {          
                                setState((data) => ({...data, returnAfter1: !state.returnAfter1, returnAfter5: false, returnAfter315: false, }))
                            }}
      inputProps={{ 'aria-label': 'controlled' }}
    />
                    </div>
                    <div className='formInput'>
                        <h5>Bus Depature 3:15 pm:</h5>
                        <Switch
                            checked={state.returnAfter315}
                            onClick={() => {          
                                setState((data) => ({...data, returnAfter315: !state.returnAfter315,returnAfter5: false, returnAfter1: false, }))
                            }}
      inputProps={{ 'aria-label': 'controlled' }}
    />
                    </div>
                    <div className='formInput'>
                        <h5>Bus Depature 5 pm:</h5>
                        <Switch
                            checked={state.returnAfter5}
                            onClick={() => {          
                                setState((data) => ({...data, returnAfter5: !state.returnAfter5, returnAfter315: false, returnAfter1: false, }))
                            }}
      inputProps={{ 'aria-label': 'controlled' }}
    />
                    </div>
                    <button >Submit</button>
                </form>
            </div>
        )
        
}

export default BusNew