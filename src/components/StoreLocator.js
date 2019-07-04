import React, { useState, useEffect } from 'react';
import { Map as Maps } from 'react-store-locator';
import Geocode from 'react-geocode';
import Loader from 'react-loader-spinner';
import useIsMounted from 'ismounted';
import StaticMap from './StaticMap';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyAojclCkVnINxiSN0uKSLG1Q5RPBvtX9HI');

// Enable or disable logs. Its optional.
Geocode.enableDebug();

const StoreLocator = props => {
  const [coordinates, setCoordinates] = useState({});
  const isMounted = useIsMounted();

  useEffect(() => {
    const getGeo = async () => {
      Geocode.fromAddress(props.location)
        .then(response => {
          if (isMounted.current) {
            setCoordinates(response.results[0].geometry.location);
          }
        })
        .catch(error => {
          console.error(error);
        });
    };

    getGeo();
    // return controller.abort();
  }, []);

  if (Object.keys(coordinates).length > 0) {
    if (isMounted.current) {
      return <StaticMap lat={coordinates.lat} lng={coordinates.lng} />;
    }
  } else {
    // console.log(coordinates);
    return <Loader type="Puff" color="#00BFFF" height="100" width="100" />;
  }
};

export default StoreLocator;
