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
import CreatableSelect from 'react-select/creatable';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../StateManagement';
import matchSorter from 'match-sorter';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import SearchBar from 'material-ui-search-bar';
import Select from 'react-select';
import { minHeight } from '@material-ui/system';

// Amplify.configure({
//   API: {
//     graphql_endpoint: awsconfig.aws_appsync_graphqlEndpoint,
//     graphql_endpoint_iam_region: awsconfig.aws_appsync_region
//   }
// });

const InventoryTable = props => {
  const [localData, setLocalData] = useState([]);
  const [searchData, setSearchData] = useState([...localData]);
  const [storageOptions, setStorageOptions] = useState([
    {
      value: 'dryStorage',
      label: 'Dry Storage'
    },
    {
      value: 'coldStorage',
      label: 'Cold Storage'
    },
    {
      value: 'freezer',
      label: 'Freezer'
    },
    {
      value: 'lowVelocity',
      label: 'Low Velocity'
    }
  ]);
  const [unitsOptions, setUnitOptions] = useState([
    {
      value: 'OZ',
      label: 'OZ'
    },
    {
      value: 'LB',
      label: 'LB'
    },
    {
      value: 'CT',
      label: 'CT'
    },
    {
      value: 'GM',
      label: 'GM'
    },
    {
      value: 'AV',
      label: 'AV'
    },
    {
      value: 'GA',
      label: 'GA'
    }
  ]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const handleStorageOption = event => {};

  const renderEditable = cellInfo => {
    const newData = [...localData];
    if (cellInfo.column.Header === 'Item') {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span>
            <MDBBtn
              className="position-relative"
              flat
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
            </MDBBtn>
          </span>
          <span>
            <MDBInput
              style={{ textAlign: 'center' }}
              size="md"
              valueDefault={cellInfo.original[cellInfo.column.id]}
              getValue={value => {
                newData[cellInfo.index][cellInfo.column.id] = value;
              }}
              onBlur={() => {
                setLocalData(newData);
              }}
            />
          </span>
        </div>
      );
    } else {
      return (
        <MDBInput
          style={{ textAlign: 'center' }}
          size="md"
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
      Header: 'Item',
      accessor: 'item',
      Cell: renderEditable
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      Cell: renderEditable
    },
    {
      Header: 'Storage',
      accessor: 'storage',
      Cell: renderEditable
    }
  ];

  return (
    <MDBContainer
      className="mt-5 text-center"
      style={{ paddingBottom: '50px' }}
    >
      <div style={{ paddingTop: '50px', paddingBottom: '80px' }}>
        <SearchBar
          hintText="Search by item number/description, quantity, storage type, price, brand, or supplier"
          onChange={event => {
            let results = matchSorter(localData, event, {
              keys: ['item', 'quantity', 'storage']
            });
            setSearchData(results);
          }}
          onRequestSearch={event => console.log(event)}
          style={{
            margin: '0 auto',
            maxWidth: 800
          }}
        />
      </div>
      <ReactTable
        className="-striped -highlight"
        noDataText={'Inventory has not been setup'}
        columns={columns}
        data={searchData}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        onPageChange={pageIndex => {
          const newData = [...localData];
          setLocalData(newData);
        }}
        renderPageSizeOptions={({
          pageSize,
          pageSizeOptions,
          rowsSelectorText,
          onPageSizeChange,
          rowsText
        }) => {
          return (
            <span style={{ width: '150px' }}>
              <Select
                onChange={e => onPageSizeChange(e.value)}
                placeholder={`${pageSize} rows`}
                options={[
                  {
                    value: 5,
                    label: '5 rows'
                  },
                  {
                    value: 10,
                    label: '10 rows'
                  },
                  {
                    value: 20,
                    label: '20 rows'
                  },
                  {
                    value: 50,
                    label: '50 rows'
                  },
                  {
                    value: 100,
                    label: '100 rows'
                  }
                ]}
              />
            </span>
          );
        }}
      />
      <h1 className="display-4" style={{ paddingTop: '80px' }}>
        <strong>Create New Inventory Item</strong>
      </h1>
      <hr className="my-4" />
      <div
        className="d-flex justify-content-center"
        style={{
          maxWidth: '600px',
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: '0',
          right: '0',
          paddingBottom: '50px'
        }}
      >
        <form>
          <label className="grey-text">Item Number</label>
          <input className="form-control" />
          <br />
          <label className="grey-text">Item Description</label>
          <input className="form-control" />
          <br />
          <label className="grey-text">Price</label>
          <input className="form-control" />
          <br />
          <MDBRow>
            <MDBCol sm="7">
              <label className="grey-text">Quantity</label>
              <input className="form-control" />
            </MDBCol>
            <MDBCol sm="5">
              <label className="grey-text">Units</label>
              <CreatableSelect
                isClearable
                onChange={e => console.log(e)}
                onInputChange={e => console.log(e)}
                options={unitsOptions}
                placeholder={'OZ'}
              />
            </MDBCol>
          </MDBRow>
          <br />
          <label className="grey-text">Storage</label>
          <CreatableSelect
            isClearable
            onChange={e => console.log(e)}
            onInputChange={e => console.log(e)}
            options={storageOptions}
            placeholder={'Select/Type Storage'}
          />
          <br />
          <label className="grey-text">Brand</label>
          <CreatableSelect
            isClearable
            onChange={e => console.log(e)}
            onInputChange={e => console.log(e)}
            options={brandOptions}
            placeholder={'Select/Type Brand'}
          />
          <br />
          <label className="grey-text">Supplier</label>
          <CreatableSelect
            isClearable
            onChange={e => console.log(e)}
            onInputChange={e => console.log(e)}
            options={supplierOptions}
            placeholder={'Select/Type Supplier'}
          />

          <div className="text-center mt-4">
            <MDBBtn color="primary">Create Item</MDBBtn>
          </div>
        </form>
      </div>
    </MDBContainer>
  );
};

export default InventoryTable;
