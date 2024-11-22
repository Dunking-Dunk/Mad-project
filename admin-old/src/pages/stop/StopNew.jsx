import './stopNew.scss'
import { useState } from 'react'
import LocationPicker from 'react-google-map-picker'
import { useDispatch } from 'react-redux'
import { createStop } from '../../store/actions/action'
import {useNavigate} from 'react-router-dom'

const DefaultLocation = {lat: 13.081384000150123, lng: 80.2599079489231}
const DefaultZoom = 10;

const StopNew = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [state, setState] = useState({
        coords: {
            latitude: 0,
            longitude: 0
        },
        address: '',
        name: '',
        timing: ''
    })
    const [zoom, setZoom] = useState(DefaultZoom)

    function updateState(data) {
        setState((state) => ({...state,...data} ))
    }

    function handleChangeLocation (lat, lng){
        updateState({ coords: { latitude: lat, longitude: lng } })
      }

    function handleChangeZoom (newZoom){
        setZoom(newZoom);
    }
    
    function handleSubmit() {
        if (state.coords.latitude !== 0 && state.coords.longitude !== 0 && state.address.length > 5 && state.name.length > 5 && state.timing.length) {
            dispatch(createStop(state))
            navigate('/stop')
        }
    }
    
    return (
        <div className='newStop'>
            <div className='newStop__container'>
                <div className='formInput'>
                    <h1 className='title'>Create New Stop</h1>
                    <h3>Pick a Location </h3>
                    <h5>Latitude: <blockquote>{state.coords.latitude}</blockquote></h5>
                    <h5>Longitude: <blockquote>{state.coords.longitude}</blockquote></h5>
                    <LocationPicker
                        defaultLocation={DefaultLocation}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{height:'600px'}}
                onChangeLocation={handleChangeLocation} 
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyCSzANgbfNQqcu_1jcNtSz21EBCTgB0U1U'
            />
                </div>
                <div className='formInput'>
                    <h3>Stop Name</h3>
                    <input placeholder='Stop name' value={state.name} onChange={(e) => {updateState({name: e.target.value})}} type='text' required/>
                </div>       
                <div className='formInput'>
                    <h3>Stop Address</h3>
                    <textarea placeholder='Stop address' value={state.address} onChange={(e) => {updateState({address: e.target.value})}} required/>
                </div>   
                <div className='formInput'>
                    <h3>Stop Timing</h3>
                    <input className='time' placeholder='Stop Timing' value={state.timing} onChange={(e) => {updateState({timing: e.target.value})}} type='time' />
                </div>   
                <button onClick={handleSubmit}>Submit</button>
            </div>
            </div>
      
    )
}

export default StopNew