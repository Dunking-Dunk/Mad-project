import './notification.scss'
import React, { useEffect , useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getAllNotfications, pushNotification, deleteNotification } from '../../store/actions/action';
import Datatable from '../../components/datatable/Datatable';

const Notification = () => {
    const dispatch = useDispatch()
    const notifications = useSelector((state) => state.notifications.notifications)
    const [state, setState] = useState({
        title: '',
        body: ''
    })

    useEffect(() => {
        dispatch(getAllNotfications())
    }, [])

    const submitNotification = (e) => {
        dispatch(pushNotification(state)).then(() => {
            dispatch(getAllNotfications())
        })
        setState({ title: '', body: '' })
    }

    const handleDelete = (id) => {
        dispatch(deleteNotification(id)).then(() => {
            dispatch(getAllNotfications())
        })
    }
     
    const notificationColumn = [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 100 },
        {
          field: "date",
          headerName: "Date",
          width: 200,
        },
        {
          field: "title",
          headerName: "Title",
          width:300,
      },  {
        field: "message",
        headerName: "Message",
        width:600,
    },
      
    //     {
    //       field: "status",
    //       headerName: "Status",
    //       width: 160,
    //       renderCell: (params) => {
    //         return (
    //           <div className={`cellWithStatus ${params.row.status}`}>
    //             {params.row.status}
    //           </div>
    //         );
    //       },
    //   },
      {
        field: "action",
        headerName: "Action",
        width: 100,
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

    const notificationRow = () => {
        return notifications.map((notification, i) => {
          return {
            sno: i + 1,
            id: notification.notification_id,
            date: notification.date,
            title: notification.title,
            message: notification.message
          }
        })
      }


    return (
        <div className="notification">
             <h1 className="notification__title">Notification</h1>
            <div className="notification__container">
                <div className="create__notification__container">
                    <input placeholder="title" onChange={(e) => {
                        setState((state) => ({...state, title: e.target.value}))
                    }} value={state.title}  className='create__notification__input'/>
                    <textarea placeholder="message" onChange={(e) => {
                        setState((state) => ({...state, body: e.target.value}))
                    }} value={state.body
                    } className='create__notification__input'/>
                    <button onClick={submitNotification}>Push</button>
                </div>
                <div className='allNotifications__container'>
                <Datatable row={notificationRow()} column={notificationColumn} />
                </div>
            </div>
        </div>
    
    )
}

export default Notification