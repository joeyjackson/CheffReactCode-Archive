import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBCardBody,
  MDBCardImage
} from 'mdbreact';
import { useStateValue } from '../state/StateManagement';

import countInventory from '../assets/img/options/countInventory.png';
import reviewInventory from '../assets/img/options/reviewInventory.png';
import makeSupplyOrder from '../assets/img/options/makeSupplyOrder.png';
import receiveInventory from '../assets/img/options/receiveInventory.png';

const DecisionPage = props => {
  const [globalStore, dispatch] = useStateValue();

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md="6">
          <div className="d-flex justify-content-center">
            <MDBBtn size="lg" color="primary" flat onClick={() => {}}>
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage className="img-fluid" src={countInventory} />
                <MDBCardBody>
                  <h6>Count Inventory</h6>
                </MDBCardBody>
              </MDBCard>
            </MDBBtn>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="d-flex justify-content-center">
            <MDBBtn size="lg" color="primary" flat onClick={() => {}}>
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage className="img-fluid" src={reviewInventory} />
                <MDBCardBody>
                  <h6>Review Inventory</h6>
                </MDBCardBody>
              </MDBCard>
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCol md="6">
          <div className="d-flex justify-content-center">
            <MDBBtn size="lg" color="primary" flat onClick={() => {}}>
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage className="img-fluid" src={makeSupplyOrder} />
                <MDBCardBody>
                  <h6>Make Supply Order</h6>
                </MDBCardBody>
              </MDBCard>
            </MDBBtn>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <div className="d-flex justify-content-center">
            <MDBBtn size="lg" color="primary" flat onClick={() => {}}>
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage className="img-fluid" src={receiveInventory} />
                <MDBCardBody>
                  <h6>Receive Inventory</h6>
                </MDBCardBody>
              </MDBCard>
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default DecisionPage;
