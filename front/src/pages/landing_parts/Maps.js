import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import restaurantData from '../../Data/Restaurant.json'

const googleKey = process.env.REACT_APP_GOOGLE_KEY;

function Map() {
  // const [selectedMarker, setSelectedMarker] = useState(true);

  return (
    <div>
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: restaurantData[0].lat, lng: restaurantData[0].lng }}
      >
        <Marker 
          position={{ lat: restaurantData[0].lat, lng: restaurantData[0].lng }}
        />
      </GoogleMap>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Maps = (props) => {
  return (
    <div className="Maps_Container" style={{ width: "100vw", height: "50vh" }}>
      <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleKey}`}
        loadingElement={<div style={{ height: "100% "}} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
export default Maps;