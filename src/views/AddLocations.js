import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBAnimation
} from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import LocationSearchBar from '../components/location/LocationSearchBar';
import { useStateValue } from '../state/StateManagement';
import { createUserFranchiseLocation } from '../api/api';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const AddLocations = () => {
  const [localFranchiseLocations, setLocalFranchiseLocations] = useState([]);
  const [globalStore, dispatch] = useStateValue();

  const classes = useStyles();

  const pushChanges = () => {
    new Promise(resolve => {
      localFranchiseLocations.map(eachItem => {
        createUserFranchiseLocation(eachItem);
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
    newData.push({
      userID: globalStore.userID,
      franchise: globalStore.selectedFranchise,
      location: globalStore.selectedAddress,
      latitude: globalStore.latitude,
      longitude: globalStore.longitude
    });
    // reset search bar parameters
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
                let newData = [...localFranchiseLocations];

                newData.splice(cellInfo.index, 1);

                setLocalFranchiseLocations(newData);
              }}
            >
              <i className="material-icons">clear</i>
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
      <h1 className="display-5">
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
        pageSize={5}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        showPageSizeOptions={true}
        noDataText={'No locations setup yet'}
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
                  }
                ]}
              />
            </span>
          );
        }}
        // do this to force the next page to update properly, there is a bug and this is the only workaround I could figure out
        onPageChange={pageIndex => {
          const newData = [...localFranchiseLocations];
          setLocalFranchiseLocations(newData);
        }}
      />
      <p className="lead" style={{ paddingTop: '50px' }}>
        Start typing the name of your restaurant below and choose from the list
        provided.
      </p>

      <LocationSearchBar
        dispatch={dispatch}
        address={globalStore.tempSearchAddress}
      />
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

export default AddLocations;
