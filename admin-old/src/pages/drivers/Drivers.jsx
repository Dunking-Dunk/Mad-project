import './drivers.scss'
import React, {  useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createDriver, deleteDriver } from '../../store/actions/action';
import Datatable from '../../components/datatable/Datatable';
import {InputLabel, MenuItem, FormControl,  Select} from '@mui/material'

const Drivers = () => {
    const dispatch = useDispatch()
  const drivers = useSelector((state) => state.drivers.drivers)
  const buses = useSelector((state) => state.buses.buses)

    const [state, setState] = useState({
        name: '',
        phoneNumber: '',
      image: '',
        busId: ''
    })
  
  const handleImage = (e) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {

        setState((state) => ({...state, image: fileReader.result}))
      }
    }

    fileReader.readAsDataURL(e.target.files[0])
  }

  const handleChange = (event) => {
    setState((state) => ({ ...state, busId: event.target.value }))
  }

    const handleSubmit = (e) => {
        e.preventDefault()
   
        if (state.name.length > 3 && state.phoneNumber)
        dispatch(createDriver(state))
      
        setState({
                name: '',
            phoneNumber: '',
          image: '',
            busId: ''
        })
    }   

    const handleDelete = (id) => {
        dispatch(deleteDriver(id))
    }

    const driverColumns = [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 150 },
        {
            field: "image",
            headerName: "Image",
            width: 100,
            renderCell: (params) => {
            return <img src={params.row.image} alt="" className='driver__img'/>
              },
        },
        {
            field: "name",
            headerName: "Name",
            width: 150,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 200,
        },
        {
          field: "bus",
          headerName: "Bus",
          width: 200,
        }, 
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
 
          return (
            <div className="cellAction">
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            </div>
          );
        },
      },
      ];
      
    
    const driverRow = () => {
      return drivers.map((driver, i) => {
        const busDriver = buses.find((bus) => bus.id === driver.busId)
          return {
            sno: i + 1,
              id: driver.id,
            image: driver.image.url,
            name: driver.name,
            phoneNumber: driver.phoneNumber,
            bus: busDriver ? `${busDriver.busNumber} ${busDriver.busSet}`: 'no bus'
          }
        })
      }

    return (
        <div className="driver">
            <h1 className="driver__form__title">New Driver</h1>
            <div className="driver__form">
                <form onSubmit={handleSubmit} enctype="multipart/form-data" >
                <div className="driver__form__container">
                    <h3>Name</h3>
                    <input type="text" class="driver__form__input" onChange={(e) => {
                        setState((data) => ({...data, name: e.target.value}) )
                    }} value={state.name} placeholder="Name"/>
                </div>
                    <div className="driver__form__container">
                    <h3>Phone Number</h3>
                    <input type="text" class="driver__form__input"  onChange={(e) => {
                        setState((data) => ({...data, phoneNumber: e.target.value}) )
                    }} value={state.phoneNumber} placeholder="Phone number"/>
                    </div>
                    <div className="driver__form__container">
                        <h3>photo</h3>
                        <input type="file" name='avatar' class="driver__form__input"  onChange={handleImage} />      
            </div>
            <div className="driver__form__container">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Bus</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
                  label="Age"
                  value={state.busId}
                  onChange={handleChange}
                >
                       <MenuItem value="">
            <em>None</em>
          </MenuItem>
                  {buses.map((bus, index) => {
                    return <MenuItem value={bus.id} key={index}>{bus.busNumber} {bus.busSet}</MenuItem>
              })}
        </Select>
      </FormControl>
            </div>
            
                    <button className="driver__form__btn">Create</button>
                </form>
                 <hr/>
            </div>
            <Datatable row={driverRow()} column={driverColumns}  />
        </div>
    )
}

export default Drivers