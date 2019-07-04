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

const Card = props => {
  return (
    <MDBCard style={{ width: '22rem' }}>
      {/* just the map */}
      <StoreLocater location={props.location} />
      <MDBCardBody>
        <MDBCardTitle>{props.name}</MDBCardTitle>
        <MDBCardText>{props.location}</MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Card;
