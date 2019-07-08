import React, { useState, useEffect, useCallback } from 'react';
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBDataTable,
  MDBTableEditable,
  MDBInput,
  MDBAnimation,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import ReactDataGrid from 'react-data-grid';
import { Connect } from 'aws-amplify-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import CreatableSelect from 'react-select/creatable';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useStateValue } from '../StateManagement';
import matchSorter from 'match-sorter';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import SearchBar from 'material-ui-search-bar';
import Select from 'react-select';
import { minHeight } from '@material-ui/system';
import CreateInventoryItem from './CreateInventoryItem';
import LoadingComponent from './LoadingComponent';
// Amplify.configure({
//   API: {
//     graphql_endpoint: awsconfig.aws_appsync_graphqlEndpoint,
//     graphql_endpoint_iam_region: awsconfig.aws_appsync_region
//   }
// });

const InventoryTable = props => {
  const [searchData, setSearchData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [globalStore, dispatch] = useStateValue();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    dispatch({
      type: 'currentLocation',
      state: props.location
    });
    dispatch({
      type: 'currentFranchise',
      state: props.franchise
    });
    // setTimeout(listInventoryItems, 250);
  }, []);

  const listInventoryItems = () => {
    API.graphql(
      graphqlOperation(queries.listInventoryItems, {
        filter: {
          location: {
            eq: props.location
          }
        }
      })
    )
      .then(result => {
        console.log(result);
        let data = result.data.listInventoryItems.items;
        dispatch({
          type: 'inventoryTableLoading',
          state: false
        });
        console.log(data);
        dispatch({
          type: 'inventoryTableItems',
          state: data
        });
      })
      .catch(err => console.log(err));
  };

  const renderEditable = cellInfo => {
    const newData = [...globalStore.inventoryTableItems];
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
                let newData = [...globalStore.inventoryTableItems];
                console.log(newData);
                newData.splice(cellInfo.index, 1);
                console.log(newData);
                dispatch({
                  type: 'inventoryTableItems',
                  state: newData
                });
              }}
            >
              <i className="material-icons">clear</i>
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
                dispatch({
                  type: 'inventoryTableItems',
                  state: newData
                });
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
            dispatch({
              type: 'inventoryTableItems',
              state: newData
            });
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
            let results = matchSorter(globalStore.inventoryTableItems, event, {
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
      <Connect
        query={graphqlOperation(queries.listInventoryItems, {
          filter: {
            location: {
              eq: props.location
            }
          },
          limit: 20
        })}
        subscription={graphqlOperation(subscriptions.onCreateInventoryItem)}
        onSubscriptionMsg={(prev, { onCreateInventoryItem }) => {
          console.log(prev);
          console.log(onCreateInventoryItem);
          let newData = [...prev.listInventoryItems.items];
          newData.push(onCreateInventoryItem);
          console.log(newData);
          return newData;
        }}
      >
        {({ data: { listInventoryItems }, loading, error }) => {
          if (error) {
            console.log(error);
          }
          let isLoading = true;
          if (loading || !listInventoryItems) {
            isLoading = true;
          } else {
            console.log('Got Something', listInventoryItems);
            isLoading = false;
          }
          if (listInventoryItems) {
            return (
              <ReactTable
                className="-striped -highlight"
                noDataText={'Inventory has not been setup'}
                columns={columns}
                data={listInventoryItems.items}
                loading={isLoading}
                LoadingComponent={LoadingComponent}
                defaultPageSize={20}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                onPageChange={pageIndex => {
                  forceUpdate();
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
            );
          }
        }}
      </Connect>

      <MDBBtn
        color="primary"
        onClick={() => {
          setModalOpen(!modalOpen);
        }}
      >
        Create New Inventory Item
      </MDBBtn>
      <MDBModal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        centered
        size="lg"
      >
        <MDBModalHeader toggle={() => setModalOpen(!modalOpen)} />
        <MDBModalBody>
          <CreateInventoryItem />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => setModalOpen(!modalOpen)}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default InventoryTable;
