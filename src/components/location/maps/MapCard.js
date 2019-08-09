import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from 'mdbreact';
import StaticMap from './StaticMap';

const MapCard = props => {
  console.log(props);
  return (
    <MDBCard style={{ width: '22rem' }}>
      {/* just the map */}
      <StaticMap lat={props.latitude} lng={props.longitude} />
      <MDBCardBody>
        <MDBCardTitle>{props.name}</MDBCardTitle>
        <MDBCardText>{props.location}</MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default MapCard;
