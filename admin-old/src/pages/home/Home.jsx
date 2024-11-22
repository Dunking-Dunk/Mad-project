import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useSelector } from 'react-redux'
import MapView from "../../components/map/MapView";


const Home = () => {
  const buses = useSelector((state) => state.buses.buses)
  const allStops = useSelector((state) => state.stops.stops)
  const quickStats = useSelector((state) => state.stats.quickStats)
  return (
    <div className="homeContainer">
      <div style={{ height: '800px', width: '100%', margin: '20px 0px 50px 0px' }}>
      <h1>All Buses and Stops</h1>
        <MapView allStops={allStops} addStops={() => {}} />
      </div>  
      <div className="home__subContianer">
        <div className="quickStats__container">
          <Widget data={quickStats} />
        </div>
      <Chart aspect={4} title="petrol consumption"/>
      </div>

      <Table buses={buses} />
      </div>
   
  );
};

export default Home;
