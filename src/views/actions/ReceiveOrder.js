import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    MDBContainer
} from 'mdbreact';
import { useStateValue } from '../../state/StateManagement';

const ReceiveOrder = props => {
  const [globalStore, dispatch] = useStateValue();

  const currentLocation = globalStore.currentLocation;
  const currentFranchise = globalStore.currentFranchise;
  if (!currentLocation) props.history.push('/');

  return (
    <MDBContainer>
      <div>Receive Order</div>
      <div>{currentLocation}</div>
      <div>{currentFranchise}</div>
    </MDBContainer>
  );
};

export default withRouter(ReceiveOrder);
