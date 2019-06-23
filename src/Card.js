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
import TableModal from './TableModal';

const Card = props => {
  return (
    <MDBCard style={{ width: '22rem' }}>
      {/* just the map */}
      <StoreLocater location={props.location} />
      <MDBCardBody>
        <MDBCardTitle>{props.name}</MDBCardTitle>
        <MDBCardText>{props.location}</MDBCardText>
      </MDBCardBody>
      {/* <TableModal location={props.location} /> */}
    </MDBCard>
  );
};

export default Card;
