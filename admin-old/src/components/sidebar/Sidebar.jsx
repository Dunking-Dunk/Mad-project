import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import MergeTypeIcon from '@mui/icons-material/MergeType';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from '../../store/actions/action'
import { useDispatch, useSelector } from 'react-redux'
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import PersonIcon from '@mui/icons-material/Person';

const Sidebar = () => {
  const Dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate()
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">REC Bus</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/bus" style={{ textDecoration: "none" }}>
            <li>
              <DirectionsBusIcon className="icon" />
              <span>Buses</span>
            </li>
          </Link>
          <Link to="/stop" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Stops</span>
            </li>
          </Link>
          <Link to="/driver" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
              <span>Drivers</span>
            </li>
          </Link>
          <Link to="/tracker" style={{ textDecoration: "none" }}>
            <li>
              <GpsFixedIcon className="icon" />
              <span>Trackers</span>
            </li>
          </Link>
          <p className="title">Information</p>
          <Link to="/announcement" style={{ textDecoration: "none" }}>
          <li>
            <AnnouncementIcon className="icon" />
            <span>Announcements</span>
          </li>
          </Link>
          <Link to="/feedback" style={{ textDecoration: "none" }}>
          <li>
            <FeedbackIcon className="icon" />
            <span>Feedback</span>
          </li>
          </Link>
          <Link  to="/notification" style={{ textDecoration: "none" }}>
            <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
            </li>
      
          </Link>
          <p className="title">SERVICE</p>
          <li>
            <MergeTypeIcon className="icon" />
            <span>Combine buses</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          {user &&
          <li>
            <AccountCircleOutlinedIcon className="icon" />
          <span>{user.name}</span>
           
          </li>
            }
          <li onClick={() => {
            Dispatch(signOut()).then(() => {
              navigate('/login')
            })
        
          }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
