import "./bus.scss"
import Datatable from "../../components/datatable/Datatable"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { deleteBus, getAllBuses, getBus, quickEditBus } from "../../store/actions/action";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch'

const List = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
  const buses = useSelector((state) => state.buses.buses)
  const [rowSelection, setRowSelection] = useState([])
  const [state, setState] = useState({
    active: true,
    morningToCollege: true,
    returnAfter315: true,
    returnAfter1: false,
    returnAfter5: false,
  })


  function updateState(data) {
    setState((state) => ({ ...state, ...data }))
  }

  const handleDelete = (id) => {
        dispatch(deleteBus(id))
  };
  
  const handleUpdate = (id) => {
    dispatch(getBus(id, true)).then(() => {
      navigate(`/bus/edit/${id}`)
    })
    
  };

  const handleView = (id) => {
    navigate(`/bus/${id}`)
  }

  const handleQuickEdit = () => {
    dispatch(quickEditBus(rowSelection, state)).then(() => {
      dispatch(getAllBuses())
    })
    setRowSelection([])
  }
    
    const busColumns = [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 200 },
        {
          field: "bus",
          headerName: "Bus",
          width: 100,
        },
        {
          field: "busName",
          headerName: "Bus Name",
          width: 150,
      },  {
        field: "depature",
        headerName: "Depature",
        width: 100,
    },
      
        {
          field: "status",
          headerName: "Status",
          width: 160,
          renderCell: (params) => {
            return (
              <div className={`cellWithStatus ${params.row.status}`}>
                {params.row.status}
              </div>
            );
          },
      },
      {
        field: "action",
        headerName: "Action",
        width: 250,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <div
                className="link"
                onClick={() => handleView(params.row.id)}
              >
                View
              </div>
               <div
                className="updateButton"
                onClick={() => handleUpdate(params.row.id)}
              >
                update
              </div>
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
      
    
    const busRow = () => {
        return buses.map((bus, i) => {
          return {
            sno: i + 1,
            id: bus.id,
            bus: `${bus.busNumber}-${bus.busSet}`,
            busName: bus.busName,
            depature: bus.returnAfter315 ? '3:15 pm' : bus.returnAfter1 ? '1:00 pm':'5:00 pm',
            status: bus.status ? "active" : "passive",
          }
        })
      }

  return (

      <div style={{padding: '10px 20px 10px 20px'}} >
           
              <div className="datatableTitle">
        Add New Bus
        <Link to="/bus/new" className="link">
          Add New
        </Link>
      </div>
      <Datatable row={busRow()} column={busColumns} setRowSelection={setRowSelection} />
      <div className="quickEdit__container">
        <h1>QuickEdit</h1>
        
      {rowSelection.length > 1 ? (
          <div>
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
              /></div>
            <button onClick={handleQuickEdit} className="updateButton">Quick edit</button>
          </div>
      ): <h3>More than one row should be selected</h3>}
      </div>
 
          </div>
      
  )
}

export default List