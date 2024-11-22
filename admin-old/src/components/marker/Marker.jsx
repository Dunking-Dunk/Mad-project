import './Marker.scss'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';

const Marker = ({stop, onClick}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '500px'
        }} onClick={() => onClick(stop)}>
            <PlaceRoundedIcon  />
            <h5 className='marker__title'>{stop.name}</h5>
        </div>
       
  
       
    )
}

export default Marker