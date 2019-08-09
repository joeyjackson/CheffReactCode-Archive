import React from 'react';
import { withRouter } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import MapCard from '../components/location/maps/MapCard';
import { useStateValue } from '../state/StateManagement';

const LocationMapList = (props) => {
  const [globalStore, dispatch] = useStateValue();

  const cardList = globalStore.franchiseLocations.map(eachLocation => (
    <MDBCol
      key={eachLocation.location}
      lg="4"
      md="6"
      style={{ paddingTop: '50px', paddingBottom: '50px' }}
    >
      <MDBBtn class="btn btn-link"
        onClick={() => {
            dispatch({
              type: 'currentLocation',
              state: eachLocation.location
            });
            dispatch({
              type: 'currentFranchise',
              state: eachLocation.franchise
            });
            props.history.push('/actions');
          }}
      >
        <MapCard
          location={eachLocation.location}
          name={eachLocation.franchise}
          latitude={eachLocation.latitude}
          longitude={eachLocation.longitude}
        />
      </MDBBtn>
    </MDBCol>
  ));

  return <MDBRow>{cardList}</MDBRow>;
};

export default withRouter(LocationMapList);
