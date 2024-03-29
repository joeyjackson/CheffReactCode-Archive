import React from 'react';
import { StaticGoogleMap, Marker } from 'react-static-google-map';

const StaticMap = props => {
  return (
    <div>
      <StaticGoogleMap
        size="400x450"
        apiKey="AIzaSyAojclCkVnINxiSN0uKSLG1Q5RPBvtX9HI"
        zoom={17}
      >
        <Marker location={props.lat.toString() + ',' + props.lng.toString()} />
      </StaticGoogleMap>
    </div>
  );
};

export default StaticMap;
