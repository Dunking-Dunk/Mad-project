import Datatable from "../../components/datatable/Datatable"
import { useDispatch, useSelector } from 'react-redux'
import { createTracker, deleteTracker } from "../../store/actions/action";
import { useState } from "react";

const Tracker = () => {
    const dispatch = useDispatch()
  const trackers = useSelector((state) => state.buses.trackers)
  const [state, setState] = useState({gpsId: '', onBusRoute: ''})

  const handleDelete = (id) => {
          dispatch(deleteTracker(id))
  };
  
  const handleSubmit = () => {
    dispatch(createTracker(state))
  }

  const updateState = (data) => {
   setState((state) => ({...state, ...data}))
  }
  
   const trackerColumns = [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 250 },
        ,
        {
          field: "gpsId",
          headerName: "GPS-ID",
          width: 100,
        },
        {
          field: "onBus",
          headerName: "Bus Route",
          width: 100,
     },
     {
      field: "bus",
      headerName: "Bus-ID",
      width: 250,
 },
        {
          field: "lat",
          headerName: "Current Latitude",
          width: 150,
        },
        {
          field: "lng",
          headerName: "Current Longitude",
          width: 150,
        },
        {
          field: "speed",
          headerName: "Speed",
          width: 100,
     },
     {
      field: "action",
      headerName: "Action",
      width: 200,
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

    const trackerRow = () => {
        return trackers.map((tracker, i) => {
          return {
            sno: i + 1,
            id: tracker.id,
            gpsId: tracker.gpsId,
            onBus: tracker.onBusRoute,
            bus: tracker.bus ? tracker.bus: 'not yet assigned to bus',
            lat: tracker.coords[0]?.latitude ? tracker.coords[0].latitude: 0,
            lng: tracker.coords[0]?.longitude? tracker.coords[0].longitude: 0,
            speed: tracker.speed
          }
        })
      }
  
  return (

      <div style={{padding: '10px 20px 10px 20px'}} >
           
              <div className="datatableTitle">
        Trackers
        </div>
        <div className="create__notification__container">
        <input placeholder="GPS-ID" className="create__notification__input" value={state.gpsId} onChange={(e) => updateState({gpsId: e.target.value})} />
        <input placeholder="On Bus Route" className="create__notification__input" value={state.onBusRoute}  onChange={(e) => updateState({onBusRoute: e.target.value})} />
        <button onClick={handleSubmit}>create</button>
        </div>
 
              <Datatable row={trackerRow()} column={trackerColumns} />
          </div>
  
 
  )
}

export default Tracker