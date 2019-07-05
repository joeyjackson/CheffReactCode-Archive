import React, { useState, useRef } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from 'mdbreact';
import StoreLocater from './StoreLocator';
import StaticMap from './StaticMap';

const Card = props => {
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

export default Card;
