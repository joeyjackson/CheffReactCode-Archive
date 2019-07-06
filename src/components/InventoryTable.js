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

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../StateManagement';
import matchSorter from 'match-sorter';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import SearchBar from 'material-ui-search-bar';

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
  const [localData, setLocalData] = useState([
    {
      franchise: 'franchise1',
      location: 'location1',
      item: 'item1',
      price: '$15',
      brand: 'brand1',
      supplier: 'supplier1'
    },
    {
      franchise: 'franchise2',
      location: 'location2',
      item: 'item2',
      price: '$15',
      brand: 'brand2',
      supplier: 'supplier2'
    },
    {
      franchise: 'franchise3',
      location: 'location3',
      item: 'item3',
      price: '$15',
      brand: 'brand3',
      supplier: 'supplier3'
    },
    {
      franchise: 'franchise4',
      location: 'location4',
      item: 'item4',
      price: '$15',
      brand: 'brand4',
      supplier: 'supplier4'
    },
    {
      franchise: 'franchise5',
      location: 'location5',
      item: 'item5',
      price: '$15',
      brand: 'brand5',
      supplier: 'supplier5'
    }
  ]);
  const [searchData, setSearchData] = useState([...localData]);
  const classes = useStyles();

  const renderEditable = cellInfo => {
    const newData = [...localData];

    if (cellInfo.column.Header === 'Franchise') {
      return (
        <MDBRow
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MDBCol size="2">
            <IconButton
              aria-label="Delete"
              className={classes.margin}
              onClick={() => {
                let newData = [...localData];
                console.log(newData);
                newData.splice(cellInfo.index, 1);
                console.log(newData);
                setLocalData(newData);
                setSearchData(newData);
              }}
            >
              <i class="material-icons">clear</i>
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
                setLocalData(newData);
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
            setLocalData(newData);
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
    },
    {
      Header: 'Item',
      accessor: 'item',
      Cell: renderEditable
    },
    {
      Header: 'Price',
      accessor: 'price',
      Cell: renderEditable
    },
    {
      Header: 'Brand',
      accessor: 'brand',
      Cell: renderEditable
    },
    {
      Header: 'Supplier',
      accessor: 'supplier',
      Cell: renderEditable
    }
  ];

  return (
    <MDBContainer style={{ paddingBottom: '50px' }}>
      <SearchBar
        onChange={event => {
          let results = matchSorter(localData, event, {
            keys: ['location', 'franchise', 'item']
          });
          setSearchData(results);
        }}
        onRequestSearch={event => console.log(event)}
        style={{
          margin: '0 auto',
          maxWidth: 800
        }}
      />
      <ReactTable
        className="-striped -highlight"
        columns={columns}
        data={searchData}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 20]}
        showPageSizeOptions={true}
        showPagination={true}
      />
    </MDBContainer>
  );
};

export default UserCompletionPage;
