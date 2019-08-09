import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage
} from 'mdbreact';

const ActionItemButton = props => {
  return (
    <div className="d-flex justify-content-center">
      <Link to={{pathname: props.route}}>
        <MDBCard style={{ width: '12rem' }}>
          <MDBCardImage className="img-fluid" src={props.image} />
          <MDBCardBody>
            <h6>{props.label}</h6>
          </MDBCardBody>
        </MDBCard>
      </Link>
    </div>
  );
};

export default ActionItemButton;
