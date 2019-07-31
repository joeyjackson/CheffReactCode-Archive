import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import ReactTable from 'react-table';
import { MDBBtn, MDBContainer, MDBInput } from 'mdbreact';
import matchSorter from 'match-sorter';
import SearchBar from 'material-ui-search-bar';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import 'react-table/react-table.css';
import '../styles.css';
import * as queries from '../api/graphql/queries';
import * as mutations from '../api/graphql/mutations';
import { useStateValue } from '../state/StateManagement';
import CircularIndeterminateLoading from '../components/inventory/CircularIndeterminateRT';

const CountInventory = () => {
  const [originalData, setOriginalData] = useState([]); // used by the Search Bar to copy the original data
  const [globalStore, dispatch] = useStateValue();

  // used to force update the react table when performing pagination of react table (workaround)
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // when component first mounts
  useEffect(() => {
    dispatch({
      type: 'inventoryTableLoading',
      state: true
    });
    // query inventory table for specific location using the storageType filter choosen by the user
    listProducts();
  }, []); // keep empty array so component doesn't rerender indefinetely

  // Updates the inventory table; used when data is edited, deleted, or created
  const refreshInventoryItems = () => {
    dispatch({
      type: 'inventoryTableLoading',
      state: true
    });
    setTimeout(listProducts(), 100);
  };

  // used to retrieve more data that is past the query limit
  // nextToken represents the next data item to be queried from
  const addNextTokenData = (currentData, nextToken) => {
    API.graphql(
      graphqlOperation(queries.listProductss, {
        nextToken: nextToken,
        filter: {
          location: {
            eq: globalStore.currentLocation
          }
        }
      })
    )
      .then(result => {
        currentData.push(result.data.listProductss.items);
        if (result.data.listProductss.nextToken !== null) {
          addNextTokenData(currentData, result.data.listProductss.nextToken);
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

  const listProducts = () => {
    API.graphql(
      graphqlOperation(queries.listProductss, {
        filter: {
          location: {
            eq: globalStore.currentLocation
          }
        },
        limit: 2147483647
      })
    )
      .then(result => {
        console.log(result);
        console.log(globalStore.currentLocation);
        if (result.data.listProductss.nextToken !== null) {
          addNextTokenData(
            result.data.listProductss.items,
            result.data.listProductss.nextToken
          );
        } else {
          dispatch({
            type: 'inventoryTableItems',
            state: result.data.listProductss.items
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

  const updateProducts = item => {
    console.log(item);
    if ('__typename' in item) {
      delete item.__typename;
    }
    API.graphql(
      graphqlOperation(mutations.updateProducts, {
        input: item
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
              updateProducts(cellInfo.original);
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
      Header: 'Item Description',
      accessor: 'description',
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
      accessor: 'unit',
      Cell: renderEditable,
      width: 125
    },
    {
      Header: 'Storage',
      accessor: 'storageType',
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
                    'storageType',
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
        <Link
          to={{
            pathname: `/location/options/${globalStore.currentLocation}`,
            state: {
              location: globalStore.currentLocation,
              franchise: globalStore.franchise
            }
          }}
        >
          <MDBBtn color="primary" rounded>
            <i className="material-icons">navigate_before</i>
          </MDBBtn>
        </Link>
        <Link
          to={{
            pathname: '/'
          }}
        >
          <MDBBtn color="primary" rounded>
            <i className="material-icons">home</i>
          </MDBBtn>
        </Link>
      </div>
    </>
  );
};

export default CountInventory;
