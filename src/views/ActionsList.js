import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdbreact';
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
  const classes = useStyles();
  return (
    <MDBContainer fluid>
      <MDBRow center className={classes.padded}>
        <MDBCol size="2">
          <ActionItemButton {...props}
            image={countInventoryImage}
            label={'Count Inventory'}
            route={`${props.location.pathname}/countInventory`}
          />
        </MDBCol>
        <MDBCol size="2">
          <ActionItemButton {...props}
            image={reviewInventoryImage}
            label={'Review Inventory'}
            route={`${props.location.pathname}/reviewInventory`}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow center className={classes.padded}>
        <MDBCol size="2">
          <ActionItemButton {...props}
            image={makeSupplyOrderImage}
            label={'Make Supply Order'}
            route={`${props.location.pathname}/makeOrder`}
          />
        </MDBCol>
        <MDBCol size="2">
          <ActionItemButton {...props}
            image={receiveInventoryImage}
            label={'Receive Supply Order'}
            route={`${props.location.pathname}/receiveOrder`}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ActionsList;
