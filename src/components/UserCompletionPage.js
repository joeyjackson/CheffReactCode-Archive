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
import SearchBar from './SearchBar';
import awsconfig from '../aws-exports.js';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../StateManagement';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';

// Amplify.configure({
//   API: {
//     graphql_endpoint: awsconfig.aws_appsync_graphqlEndpoint,
//     graphql_endpoint_iam_region: awsconfig.aws_appsync_region
//   }
// });

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const UserCompletionPage = () => {
  const [localFranchiseLocations, setLocalFranchiseLocations] = useState([]);
  const [globalStore, dispatch] = useStateValue();
  const classes = useStyles();

  const createUserFranchiseLocations = Item => {
    API.graphql(
      graphqlOperation(mutations.createUserLocations, {
        input: Item
      })
    )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const pushChanges = () => {
    new Promise(resolve => {
      localFranchiseLocations.map(eachItem => {
        let eachItemCopy = { ...eachItem };
        eachItemCopy['user'] = globalStore.userEmail;
        console.log(eachItemCopy);
        createUserFranchiseLocations(eachItemCopy);
      });
      dispatch({
        type: 'franchiseLocations',
        state: localFranchiseLocations
      });
      resolve();
    });
  };

  const addRestaurant = () => {
    let newData = [...localFranchiseLocations];
    console.log(localFranchiseLocations);
    newData.push({
      franchise: globalStore.selectedFranchise,
      location: globalStore.selectedAddress,
      latitude: globalStore.latitude,
      longitude: globalStore.longitude
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
      type: 'tempSearchAddress',
      state: ''
    });
    setLocalFranchiseLocations(newData);
  };

  const renderEditable = cellInfo => {
    const newData = [...localFranchiseLocations];

    if (cellInfo.column.Header === 'Franchise') {
      return (
        <MDBRow>
          <MDBCol size="2">
            <IconButton
              aria-label="Delete"
              className={classes.margin}
              onClick={() => {
                let newData = [...localFranchiseLocations];
                console.log(newData);
                newData.splice(cellInfo.index, 1);
                console.log(newData);
                setLocalFranchiseLocations(newData);
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
                setLocalFranchiseLocations(newData);
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
            setLocalFranchiseLocations(newData);
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

      {localFranchiseLocations.length === 0 ? (
        <p className="lead" style={{ paddingBottom: '25px' }}>
          You currently have no restaurants associated with your account.
        </p>
      ) : (
        <></>
      )}

      <ReactTable
        className="-striped -highlight"
        columns={columns}
        data={localFranchiseLocations}
        defaultPageSize={5}
        style={{
          height: '400px'
        }}
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

        {localFranchiseLocations.length > 0 ? (
          <MDBAnimation type="pulse" infinite>
            <MDBBtn color="success" rounded onClick={() => pushChanges()}>
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
