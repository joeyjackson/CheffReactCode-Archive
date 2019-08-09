import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdbreact';
import { useStateValue } from '../state/StateManagement';
import ActionItemButton from '../components/actions/ActionItemButton'
import countInventoryImage from '../assets/img/options/countInventory.png';
import reviewInventoryImage from '../assets/img/options/reviewInventory.png';
import makeSupplyOrderImage from '../assets/img/options/makeSupplyOrder.png';
import receiveInventoryImage from '../assets/img/options/receiveInventory.png';

const useStyles = makeStyles({
  padded: {
    padding: '10px',
  },
});

const ActionsList = props => {
  const [globalStore] = useStateValue();
  const currentLocation = globalStore.currentLocation;
  if (!currentLocation) props.history.push('/');

  const classes = useStyles();
  return (
    <MDBContainer fluid>
      <MDBRow center className={classes.padded}>
        <MDBCol size="2">
          <ActionItemButton
            image={countInventoryImage}
            label={'Count Inventory'}
            route={'/actions/countInventory'}
          />
        </MDBCol>
        <MDBCol size="2">
          <ActionItemButton
            image={reviewInventoryImage}
            label={'Review Inventory'}
            route={'/actions/reviewInventory'}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow center className={classes.padded}>
        <MDBCol size="2">
          <ActionItemButton
            image={makeSupplyOrderImage}
            label={'Make Supply Order'}
            route={'/actions/makeOrder'}
          />
        </MDBCol>
        <MDBCol size="2">
          <ActionItemButton
            image={receiveInventoryImage}
            label={'Receive Supply Order'}
            route={'/actions/receiveOrder'}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default withRouter(ActionsList);
