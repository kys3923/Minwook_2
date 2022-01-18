import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as restaurantData from '../../Data/Restaurant.json'

const googleKey = process.env.REACT_APP_GOOGLE_KEY;

console.log(restaurantData);

function Map() {
  // const [selectedMarker, setSelectedMarker] = useState(true);

  return (
    <div>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 41.15567709337682, lng: -74.19374803281572 }}
      >
        {/* {restaurantData.map(data => {

        })} */}
      </GoogleMap>
      {/* <Marker position={{ lat: 41.15567709337682, lng: -74.19374803281572 }} /> */}

    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Maps = (props) => {
  return (
    <div className="Maps_Container" style={{ width: "100vw", height: "70vh" }}>
      <h1>google map section</h1>
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