import React, { useState, useEffect } from 'react';
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBDataTable,
  MDBTableEditable,
  MDBInput,
  MDBAnimation
} from 'mdbreact';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import ReactDataGrid from 'react-data-grid';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import SearchBar from './components/SearchBar';
import awsconfig from './aws-exports.js';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from './StateManagement';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const UserCompletionPage = () => {
  const [globalStore, dispatch] = useStateValue();
  const classes = useStyles();
  const addRestaurant = () => {
    let newData = [...globalStore.franchiseLocations];
    console.log(globalStore.franchiseLocations);
    newData.push({
      franchise: globalStore.selectedFranchise,
      location: globalStore.selectedAddress
    });
    dispatch({
      type: 'selectedFranchise',
      state: ''
    });
    dispatch({
      type: 'selectedAddress',
      state: ''
    });
    dispatch({
      type: 'franchiseLocations',
      state: newData
    });
    dispatch({
      type: 'tempSearchAddress',
      state: ''
    });
  };

  const renderEditable = cellInfo => {
    const newData = [...globalStore.franchiseLocations];

    if (cellInfo.column.Header === 'Franchise') {
      return (
        <MDBRow>
          <MDBCol size="2">
            <IconButton
              aria-label="Delete"
              className={classes.margin}
              onClick={() => {
                let newData = [...globalStore.franchiseLocations];
                console.log(newData);
                newData.splice(cellInfo.index, 1);
                console.log(newData);
                dispatch({
                  type: 'franchiseLocations',
                  state: newData
                });
              }}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </MDBCol>
          <MDBCol>
            <MDBInput
              style={{ textAlign: 'center' }}
              size="sm"
              valueDefault={cellInfo.original[cellInfo.column.id]}
              getValue={value => {
                newData[cellInfo.index][cellInfo.column.id] = value;
              }}
              onBlur={() => {
                dispatch({
                  type: 'franchiseLocations',
                  state: newData
                });
              }}
            />
          </MDBCol>
        </MDBRow>
      );
    } else {
      return (
        <MDBInput
          style={{ textAlign: 'center' }}
          size="sm"
          valueDefault={cellInfo.original[cellInfo.column.id]}
          getValue={value => {
            newData[cellInfo.index][cellInfo.column.id] = value;
          }}
          onBlur={() => {
            dispatch({
              type: 'franchiseLocations',
              state: newData
            });
          }}
        />
      );
    }
  };

  const columns = [
    {
      Header: 'Franchise',
      accessor: 'franchise',
      Cell: renderEditable
    },
    {
      Header: 'Location',
      accessor: 'location',
      Cell: renderEditable
    }
  ];

  return (
    <MDBContainer
      className="mt-5 text-center"
      style={{ paddingBottom: '50px' }}
    >
      <h1 className="display-4">
        <strong>First Time Setup</strong>
      </h1>
      <hr className="my-5" />

      {globalStore.franchiseLocations.length === 0 ? (
        <p className="lead" style={{ paddingBottom: '25px' }}>
          You currently have no restaurants associated with your account.
        </p>
      ) : (
        <></>
      )}

      <ReactTable
        className="-striped -highlight"
        columns={columns}
        data={globalStore.franchiseLocations}
        defaultPageSize={5}
      />
      <p className="lead" style={{ paddingTop: '50px' }}>
        Start typing the name of your restaurant below and choose from the list
        provided.
      </p>

      <SearchBar dispatch={dispatch} address={globalStore.tempSearchAddress} />
      <div className="d-flex justify-content-between">
        {globalStore.selectedFranchise !== '' ? (
          <MDBAnimation type="pulse" infinite>
            <MDBBtn color="primary" rounded onClick={() => addRestaurant()}>
              Add Restaurant
            </MDBBtn>
          </MDBAnimation>
        ) : (
          <MDBBtn color="primary" rounded disabled>
            Add Restaurant
          </MDBBtn>
        )}

        {globalStore.franchiseLocations.length > 0 ? (
          <MDBAnimation type="pulse" infinite>
            <MDBBtn color="success" rounded onClick={() => addRestaurant()}>
              Done
            </MDBBtn>
          </MDBAnimation>
        ) : (
          <MDBBtn color="success" rounded disabled>
            Done
          </MDBBtn>
        )}
      </div>
    </MDBContainer>
  );
};

export default UserCompletionPage;
