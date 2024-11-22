import { Routes, Route } from "react-router-dom";
import './Main.scss'
import { useEffect } from "react";
import { getAllGpsTracker, getAllStop, getAllBuses, currentUser, getQuickStats, getAllDriver } from "../store/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

import StopNew from "./stop/StopNew";
import BusNew from "./bus/BusNew";
import Home from "./home/Home";
import Bus from "./bus/bus";
import Stop from "./stop/stop";
import Single from "./single/Single";
import Sidebar from "../components/sidebar/Sidebar";
import CreateAnnouncement from "./announcement/CreateAnnouncement";
import Announcement from './announcement/Announcement'
import Feedback from './feedback/Feedback'
import BusView from "./bus/BusView";
import Notification from "./notification/Notification"
import Tracker from "./tracker/Tracker";
import Drivers from "./drivers/Drivers";

const Main = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.users.user)

  useEffect(() => {
    dispatch(currentUser())
    dispatch(getAllStop())
    dispatch(getAllBuses())
    dispatch(getAllGpsTracker())
    // dispatch(getQuickStats())
    dispatch(getAllGpsTracker())
    dispatch(getAllDriver())
  }, [])

  if (user) {
    return (
      <div className='main'>
        <Sidebar />
        <div className="main__container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="bus">
              <Route index element={<Bus />} />
              <Route path=":id" element={<BusView />} />
              <Route path="edit/:busId" element={<BusNew update={true} />} />
              <Route path="new" element={<BusNew />} />
            </Route>
            <Route path="stop">
              <Route index element={<Stop />} />
              <Route path=":stopId" element={<Single />} />
              <Route path="new" element={<StopNew />} />
            </Route>
            <Route path="tracker">
              <Route index element={<Tracker />} />
            </Route>
            <Route path="announcement">
              <Route index element={<Announcement />} />
              <Route path="new" element={<CreateAnnouncement />} />
            </Route>
            <Route path="feedback" element={<Feedback />} />
            <Route path="notification">
              <Route index element={<Notification />} />
            </Route>
            <Route path="driver">
              <Route index element={<Drivers />} />
            </Route>
          </Routes>
        </div>

      </div>

    )
  } else {
    return (
      <div className="main__container">
        <h1 className="error">Please login to access admin dashboard</h1>
        <button onClick={() => {
          navigate('/login')
        }}>SignIn</button>
      </div>

    )
  }


}

export default Main