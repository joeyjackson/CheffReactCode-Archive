import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import ReactTable from 'react-table';
import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';
import matchSorter from 'match-sorter';
import SearchBar from 'material-ui-search-bar';
import { API, graphqlOperation } from 'aws-amplify';
import 'react-table/react-table.css';
import '../styles.css';
import * as queries from '../api/graphql/queries';
import * as mutations from '../api/graphql/mutations';
import { useStateValue } from '../state/StateManagement';
import CreateInventoryItemForm from '../components/inventory/CreateInventoryItemForm';
import EditInventoryItemForm from '../components/inventory/EditInventoryItemForm';
import CircularIndeterminateLoading from '../components/inventory/CircularIndeterminateRT';

var jsPDF = require('jspdf');
require('jspdf-autotable');

const uuidv1 = require('uuid/v1');

const InventoryTable = props => {
  const [originalData, setOriginalData] = useState([]);
  const [editInventoryModal, setEditInventoryModal] = useState(false);
  const [createInventoryModal, setCreateInventoryModalModal] = useState(false);
  const [globalStore, dispatch] = useStateValue();
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

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
      type: 'inventoryTableLoading',
      state: true
    });
    listInventoryItems();
  }, []); // keep empty array so component doesn't rerender indefinetely

  const generateSupplyOrder = () => {
    if (globalStore.inventoryTableItems.length > 0) {
      const doc = new jsPDF('l', 'mm', 'a3');
      doc.setFontSize(25);
      doc.text(65, 20, 'Supply Order Form'); //title
      doc.setFontSize(20);
      doc.text(20, 40, props.franchise);
      doc.setFontSize(15);
      doc.text(20, 50, props.location);

      let body = [];
      globalStore.inventoryTableItems.map(eachData => {
        body.push([
          eachData.itemNumber,
          eachData.item,
          eachData.price,
          eachData.quantity,
          eachData.parValue,
          eachData.parValue - eachData.quantity,
          eachData.units,
          eachData.storage,
          eachData.brand,
          eachData.supplier
        ]);
      });

      doc.autoTable({
        startY: 70,
        theme: 'grid',
        head: [
          [
            'Item #',
            'Item',
            'Price',
            'Quantity',
            'Par Value',
            'R.O.Q',
            'Units',
            'Storage',
            'Brand',
            'Supplier'
          ]
        ],
        body: body
      });

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;

      var strippedFranchise = props.franchise.split(' ').join('_');

      doc.save(`${strippedFranchise}_SupplyOrder_${today}.pdf`);
    }
  };

  const refreshInventoryItems = () => {
    dispatch({
      type: 'inventoryTableLoading',
      state: true
    });
    setTimeout(listInventoryItems(), 100);
  };

  const addNextTokenData = (currentData, nextToken, storageFilter) => {
    API.graphql(
      graphqlOperation(queries.listInventoryItems, {
        nextToken: nextToken,
        filter: {
          location: {
            eq: props.location
          },
          and: { or: storageFilter }
        }
      })
    )
      .then(result => {
        currentData.push(...result.data.listInventoryItems.items);

        if (result.data.listInventoryItems.nextToken !== null) {
          addNextTokenData(
            currentData,
            result.data.listInventoryItems.nextToken,
            storageFilter
          );
        } else {
          dispatch({
            type: 'inventoryTableItems',
            state: currentData
          });
          dispatch({
            type: 'inventoryTableLoading',
            state: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const listInventoryItems = () => {
    let storageKeys = Object.keys(globalStore.storageFilter);
    console.log(globalStore.storageFilter);
    let tempStorageFilter = [];
    storageKeys.map(eachKey => {
      switch (eachKey) {
        case 'dryGoods':
          if (globalStore.storageFilter[eachKey]) {
            tempStorageFilter.push({ storage: { eq: 'Dry Goods' } });
          }

          break;
        case 'packagingPaperCleaning':
          if (globalStore.storageFilter[eachKey]) {
            tempStorageFilter.push({
              storage: { eq: 'Packaging/Paper/Cleaning' }
            });
          }
          break;
        case 'produce':
          if (globalStore.storageFilter[eachKey]) {
            tempStorageFilter.push({ storage: { eq: 'Produce' } });
          }
          break;
        case 'protein':
          if (globalStore.storageFilter[eachKey]) {
            tempStorageFilter.push({ storage: { eq: 'Protein' } });
          }
          break;
        case 'dairy':
          if (globalStore.storageFilter[eachKey]) {
            tempStorageFilter.push({ storage: { eq: 'Dairy' } });
          }
          break;
        default:
          break;
      }
    });

    console.log(tempStorageFilter);

    if (tempStorageFilter.length === 0) {
      tempStorageFilter = [
        { storage: { eq: 'Dry Goods' } },
        { storage: { eq: 'Packaging/Paper/Cleaning' } },
        { storage: { eq: 'Produce' } },
        { storage: { eq: 'Protein' } },
        { storage: { eq: 'Dairy' } }
      ];
    }

    API.graphql(
      graphqlOperation(queries.listInventoryItems, {
        filter: {
          location: {
            eq: props.location
          },
          and: { or: tempStorageFilter }
        },
        limit: 2147483647
      })
    )
      .then(result => {
        if (result.data.listInventoryItems.nextToken !== null) {
          addNextTokenData(
            result.data.listInventoryItems.items,
            result.data.listInventoryItems.nextToken,
            tempStorageFilter
          );
        } else {
          dispatch({
            type: 'inventoryTableItems',
            state: result.data.listInventoryItems.items
          });
          dispatch({
            type: 'inventoryTableLoading',
            state: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateInventoryItem = item => {
    console.log(item);
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
        // refreshInventoryItems();
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
        console.log(result);
        refreshInventoryItems();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderEditable = cellInfo => {
    const newData = [...globalStore.inventoryTableItems];
    switch (cellInfo.column.Header) {
      case 'Action':
        return (
          <div className="d-flex justify-content-around">
            <span>
              <MDBBtn
                className="position-relative"
                color="primary"
                floating
                onClick={() => {
                  deleteInventoryItem(cellInfo.original.id);
                }}
              >
                <i className="material-icons">clear</i>
              </MDBBtn>
            </span>
            <span>
              <MDBBtn
                className="position-relative"
                color="primary"
                floating
                onClick={() => {
                  dispatch({
                    type: 'inventoryItemToUpdate',
                    state: cellInfo.original
                  });
                  setEditInventoryModal(true);
                }}
              >
                <i className="material-icons">edit</i>
              </MDBBtn>
            </span>
          </div>
        );
      case 'Item Description':
        return (
          <MDBContainer style={{ paddingTop: '30px' }}>
            <strong>{cellInfo.original[cellInfo.column.id]}</strong>
          </MDBContainer>
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
          <MDBContainer style={{ paddingTop: '30px' }}>
            <span className="align-middle">
              <strong>{cellInfo.original[cellInfo.column.id]}</strong>
            </span>
          </MDBContainer>
        );

      case 'Storage':
        return (
          <MDBContainer style={{ paddingTop: '30px' }}>
            <span className="align-middle">
              <strong>{cellInfo.original[cellInfo.column.id]}</strong>
            </span>
          </MDBContainer>
        );

      default:
        return <div>Type not supported</div>;
    }
  };

  const columns = [
    {
      Header: 'Action',
      accessor: 'action',
      Cell: renderEditable,
      width: 200
    },
    {
      Header: 'Item Description',
      accessor: 'item',
      Cell: renderEditable
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      Cell: renderEditable,
      width: 125
    },
    {
      Header: 'Units',
      accessor: 'units',
      Cell: renderEditable,
      width: 125
    },
    {
      Header: 'Storage',
      accessor: 'storage',
      Cell: renderEditable,
      width: 300
    }
  ];

  return (
    <>
      <div style={{ paddingTop: '50px', paddingBottom: '80px' }}>
        <SearchBar
          hintText="Search Items"
          onChange={searchString => {
            if (searchString === '') {
              dispatch({
                type: 'inventoryTableItems',
                state: originalData
              });
            } else {
              let results = matchSorter(
                globalStore.inventoryTableItems,
                searchString,
                {
                  keys: [
                    'item',
                    'quantity',
                    'storage',
                    'units',
                    'price',
                    'brand',
                    'supplier'
                  ]
                }
              );
              dispatch({
                type: 'inventoryTableItems',
                state: results
              });
            }
          }}
          onBlur={event => {
            dispatch({
              type: 'inventoryTableItems',
              state: originalData
            });
          }}
          onFocus={event => setOriginalData(globalStore.inventoryTableItems)}
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
        data={globalStore.inventoryTableItems}
        getTdProps={() => {
          return {
            style: {
              overflow: 'visible',
              verticalAlign: 'middle',
              textAlign: 'center'
            }
          };
        }}
        loading={globalStore.inventoryTableLoading}
        LoadingComponent={CircularIndeterminateLoading}
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
      <div className="d-flex justify-content-around">
        <MDBBtn
          color="primary"
          rounded
          onClick={() => {
            setCreateInventoryModalModal(!createInventoryModal);
          }}
        >
          Create New Inventory Item
        </MDBBtn>
        <MDBBtn
          color="info"
          rounded
          onClick={() => {
            generateSupplyOrder();
          }}
        >
          Generate Supply Order
        </MDBBtn>
      </div>
      <div className="d-flex justify-content-around">
        <Link
          to={{
            pathname: `/location/storageFilter/${props.location}`,
            state: {
              location: props.location,
              franchise: props.franchise
            }
          }}
        >
          <MDBBtn color="primary" rounded>
            <i class="material-icons">navigate_before</i>
          </MDBBtn>
        </Link>
        <Link
          to={{
            pathname: '/'
          }}
        >
          <MDBBtn color="primary" rounded>
            <i class="material-icons">home</i>
          </MDBBtn>
        </Link>
      </div>
      {/* Create Inventory Modal */}
      <MDBModal
        isOpen={createInventoryModal}
        toggle={() => setCreateInventoryModalModal(!createInventoryModal)}
        centered
        size="lg"
      >
        <MDBModalHeader
          toggle={() => setCreateInventoryModalModal(!createInventoryModal)}
        />
        <MDBModalBody>
          <CreateInventoryItemForm />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn
            color="secondary"
            onClick={() => {
              setCreateInventoryModalModal(!createInventoryModal);
              refreshInventoryItems();
            }}
          >
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      {/* Edit Inventory Modal */}
      <MDBModal
        isOpen={editInventoryModal}
        toggle={() => setEditInventoryModal(!editInventoryModal)}
        centered
        size="lg"
      >
        <MDBModalHeader
          toggle={() => {
            setEditInventoryModal(!editInventoryModal);
            refreshInventoryItems();
          }}
        />
        <MDBModalBody>
          <EditInventoryItemForm />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn
            color="secondary"
            onClick={() => {
              setEditInventoryModal(!editInventoryModal);
              refreshInventoryItems();
            }}
          >
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};

export default InventoryTable;
