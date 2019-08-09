import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    MDBContainer
} from 'mdbreact';
import { useStateValue } from '../../state/StateManagement';

const ReviewInventory = props => {
  const [globalStore, dispatch] = useStateValue();

  const currentLocation = globalStore.currentLocation;
  const currentFranchise = globalStore.currentFranchise;
  if (!currentLocation) props.history.push('/');

  return (
    <MDBContainer>
      <div>Review Inventory</div>
      <div>{currentLocation}</div>
      <div>{currentFranchise}</div>
    </MDBContainer>
  );
};

export default withRouter(ReviewInventory);