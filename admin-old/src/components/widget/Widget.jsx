import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import StoreIcon from '@mui/icons-material/Store';
import CommentIcon from '@mui/icons-material/Comment';
import {Link} from 'react-router-dom'

const Widget = ({ type, data }) => {

  return (
    <div>
    <div className="widget">
      <div className="left">
        <span className="title">BUSES</span>
        <span className="counter">
          {data.totalBus}
          </span>
          <Link to='/bus' style={{textDecoration: 'none'}}>
          <span className="link">Manage</span>
          </Link>
     
        </div>
        <DirectionsBusIcon />
      <div className="right">
          <h5 className="title">Return after 1:00 pm  <span className="counter">
          {data.returnAfter1}
          </span></h5>
          <h5 className="title">Return after 3:15 pm  <span className="counter">
          {data.returnAfter315}
          </span></h5>
          <h5 className="title">Return after 5:00 pm  <span className="counter">
          {data.returnAfter5}
          </span></h5>
      </div>
      
      </div>
      <div className="widget">
      <div className="left">
        <span className="title">STOPS</span>
        <span className="counter">
          {data.totalStops}
        </span>
        <Link to='/stop' style={{textDecoration: 'none'}}>
          <span className="link">Manage</span>
          </Link>
     
      </div>
      <div className="right">
        <StoreIcon/>
      </div>
      
      </div>
      <div className="widget">
      <div className="left">
        <span className="title">FEEDBACKS</span>
        <span className="counter">
          {data.totalFeedbacks}
        </span>
        <Link to='/feedback' style={{textDecoration: 'none'}}>
          <span className="link">Manage</span>
          </Link>
     
      </div>
      <div className="right">
        <CommentIcon/>
      </div>
      
      </div>
      <div className="widget">
      <div className="left">
        <span className="title">ANNOUNCEMENT</span>
        <span className="counter">
          {data.totalAnnouncements}
        </span>
        <Link to='/announcement' style={{textDecoration: 'none'}}>
          <span className="link">Manage</span>
          </Link>
     
      </div>
      <div className="right">
        <CommentIcon/>
      </div>
      
    </div>
    </div>

  );
};

export default Widget;
