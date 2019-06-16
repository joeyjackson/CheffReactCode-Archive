import React from 'react';
// import { Map as Maps } from 'react-store-locator';
import ReactMapGL, { Marker } from 'react-map-gl';

const EmbededMaps = props => {
  return (
    <ReactMapGL
      width={352}
      height={500}
      latitude={props.lat}
      longitude={props.lng}
      zoom={15}
      mapboxApiAccessToken="pk.eyJ1Ijoibmljb2xhc20xMSIsImEiOiJjand4MzllZ2Qwb2JyNGRwZm9pNGtzZDByIn0.W6Q-O5Glism3QfQ1Wm_C6A"
    >
      <Marker
        latitude={props.lat}
        longitude={props.lng}
        offsetLeft={-20}
        offsetTop={-40}
      >
        <img src={require('./restaurantIcon.png')} alt="" />
      </Marker>
    </ReactMapGL>
  );
};

export default EmbededMaps;

{
  /* <StaticMap
      width={352}
      height={500}
      latitude={props.lat}
      longitude={props.lng}
      zoom={15}
      mapboxApiAccessToken="pk.eyJ1Ijoibmljb2xhc20xMSIsImEiOiJjand4MzllZ2Qwb2JyNGRwZm9pNGtzZDByIn0.W6Q-O5Glism3QfQ1Wm_C6A"
    /> */
}
