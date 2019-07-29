import React from 'react';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';
import MapCard from '../components/maps/MapCard';
import { useStateValue } from '../state/StateManagement';

const LocationMapList = () => {
  const globalStore = useStateValue()[0];

  const cardList = globalStore.franchiseLocations.map(eachLocation => (
    <MDBCol
      key={eachLocation.location}
      lg="4"
      md="6"
      style={{ paddingTop: '50px', paddingBottom: '50px' }}
    >
      <Link
        to={{
          pathname: `/location/options/${eachLocation.location}`,
          state: {
            location: eachLocation.location,
            franchise: eachLocation.franchise
          }
        }}
      >
        <div className="d-flex justify-content-center">
          <MapCard
            location={eachLocation.location}
            name={eachLocation.franchise}
            latitude={eachLocation.latitude}
            longitude={eachLocation.longitude}
          />
        </div>
      </Link>
    </MDBCol>
  ));

  return <MDBRow>{cardList}</MDBRow>;
};

export default LocationMapList;
