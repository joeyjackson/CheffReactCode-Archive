/* eslint-disable default-case */
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
  MDBModalFooter,
  MDBSelect
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
import './Custom.css';

const uuidv1 = require('uuid/v1');

const useForceUpdate = () => useState()[1];

const InventoryTable = props => {
  const [searchData, setSearchData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [globalStore, dispatch] = useStateValue();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    console.log('mounted');
    dispatch({
      type: 'currentLocation',
      state: props.location
    });
    dispatch({
      type: 'currentFranchise',
      state: props.franchise
    });
    dispatch({
      type: 'itemToRemove',
      state: props.franchise
    });
  }, []);

  const createFakeItem = () => {
    const id = uuidv1();
    API.graphql(
      graphqlOperation(mutations.createInventoryItem, {
        input: {
          franchise: 'NA',
          location: 'NA',
          item: 'NA',
          itemNumber: 1234,
          storage: 'NA',
          category: 'NA',
          price: 123,
          quantity: 123,
          packSize: 'NA',
          units: 'NA',
          brand: 'NA',
          supplier: 'NA',
          parValue: 'NA',
          id: id
        }
      })
    )
      .then(result => {
        API.graphql(
          graphqlOperation(mutations.deleteInventoryItem, {
            input: { id: id }
          })
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateInventoryItem = item => {
    if ('__typename' in item) {
      delete item.__typename;
    }
    API.graphql(
      graphqlOperation(mutations.updateInventoryItem, {
        input: item
      })
    )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteInventoryItem = ItemID => {
    console.log(ItemID);
    API.graphql(
      graphqlOperation(mutations.deleteInventoryItem, {
        input: { id: ItemID }
      })
    )
      .then(result => {
        createFakeItem();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderEditable = cellInfo => {
    const newData = [...globalStore.inventoryTableItems];
    switch (cellInfo.column.Header) {
      case 'Item Description':
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
                  deleteInventoryItem(cellInfo.original.id);
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
                  updateInventoryItem(cellInfo.original);
                }}
              />
            </span>
          </div>
        );
      case 'Quantity':
        return (
          <MDBInput
            style={{ textAlign: 'center' }}
            size="md"
            type="number"
            valueDefault={cellInfo.original[cellInfo.column.id]}
            getValue={value => {
              newData[cellInfo.index][cellInfo.column.id] = value;
            }}
            onBlur={() => {
              updateInventoryItem(cellInfo.original);
            }}
          />
        );
      case 'Units':
        return (
          <MDBSelect
            style={{ textAlign: 'center' }}
            options={globalStore.unitOptions}
            selected={cellInfo.original.units}
            getValue={value => {
              newData[cellInfo.index][cellInfo.column.id] = value[0];
              updateInventoryItem(cellInfo.original);
            }}
          />
        );

      case 'Storage':
        return (
          <MDBSelect
            options={globalStore.storageOptions}
            selected={cellInfo.original.storage}
            getValue={value => {
              newData[cellInfo.index][cellInfo.column.id] = value[0];
              updateInventoryItem(cellInfo.original);
            }}
          />
        );
    }
  };

  const columns = [
    {
      Header: 'Item Description',
      accessor: 'item',
      Cell: renderEditable
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      Cell: renderEditable
    },
    {
      Header: 'Units',
      accessor: 'units',
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
          var listInventoryItems;
          if ('listInventoryItems' in prev) {
            listInventoryItems = [...prev.listInventoryItems.items];
          } else {
            listInventoryItems = prev;
          }
          console.log(globalStore);
          console.log(listInventoryItems);
          // fake data created so we can remove from the table
          if (onCreateInventoryItem.franchise === 'NA') {
            for (let i = 0; i < listInventoryItems.length; i++) {
              if (listInventoryItems[i].id === globalStore.itemToRemove) {
                listInventoryItems.splice(i, 1);
              }
            }
            console.log(listInventoryItems);
            return listInventoryItems;
          }
          listInventoryItems.push(onCreateInventoryItem);
          return listInventoryItems;
        }}
      >
        {props => {
          console.log(props);
          var data;
          if (props.loading) {
            return (
              <ReactTable
                className="-striped -highlight"
                noDataText={'Inventory has not been setup'}
                columns={columns}
                data={[]}
                defaultPageSize={10}
                loading={props.loading}
                LoadingComponent={LoadingComponent}
              />
            );
          } else {
            if ('listInventoryItems' in props.data) {
              data = props.data.listInventoryItems.items;
            } else {
              data = props.data;
            }

            return (
              <ReactTable
                className="-striped -highlight"
                noDataText={'Inventory has not been setup'}
                columns={columns}
                data={data}
                getTdProps={() => {
                  return {
                    style: {
                      overflow: 'visible'
                    }
                  };
                }}
                resolveData={data => {
                  dispatch({
                    type: 'inventoryTableItems',
                    state: data
                  });
                  return data;
                }}
                loading={props.loading}
                LoadingComponent={LoadingComponent}
                defaultPageSize={10}
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
