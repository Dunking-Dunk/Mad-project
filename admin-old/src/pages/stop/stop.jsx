import "./stop.scss"
import Datatable from "../../components/datatable/Datatable"
import { useDispatch, useSelector } from 'react-redux'
import { deleteStop } from "../../store/actions/action";
import { Link } from "react-router-dom"

const List = () => {
    const dispatch = useDispatch()
    const stops = useSelector((state) => state.stops.stops)

  const handleDelete = (id) => {
      // console.log(id)
          dispatch(deleteStop(id))
      };
    
    
   const stopColumns = [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 200 },
        {
          field: "stop",
          headerName: "Stop",
          width: 200,
        },
        {
          field: "stopTiming",
          headerName: "Timing",
          width: 100,
        },
        {
          field: "lat",
          headerName: "Latitude",
          width: 150,
        },
        {
          field: "lng",
          headerName: "Longitude",
          width: 150,
        },
        {
          field: "address",
          headerName: "Address",
          width: 500,
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
    }
      ];

    const stopRow = () => {
        return stops.map((stop, i) => {
          return {
            sno: i + 1,
            id: stop.id,
            stop: stop.name,
            stopTiming: stop.timing,
            lat: stop.coords.latitude,
            lng: stop.coords.longitude,
            address: stop.address ? stop.address : '-'
          }
        })
      }
  
  return (

      <div style={{padding: '10px 20px 10px 20px'}} >
           
              <div className="datatableTitle">
        Add New Stop
        <Link to="/stop/new" className="link">
          Add New
        </Link>
      </div>
              <Datatable row={stopRow()} column={stopColumns} />
          </div>
  
 
  )
}

export default List