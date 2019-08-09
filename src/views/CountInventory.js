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

const CountInventory = props => {
  const [originalData, setOriginalData] = useState([]); // used by the Search Bar to copy the original data
  const [globalStore, dispatch] = useStateValue();

  // used to force update the react table when performing pagination of react table (workaround)
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // when component first mounts
  useEffect(() => {
    dispatch({
      type: 'invCountTableLoading',
      state: true
    });
    // query inventory table for specific location using the storageType filter choosen by the user
    checkInventoryCarts();
  }, []); // keep empty array so component doesn't rerender indefinetely

  const createInventoryCart = () => {
    API.graphql(
      graphqlOperation(mutations.createInventoryCarts, {
        input: {
          location: props.linkProps.location.state.location,
          completed: false
        }
      })
    )
      .then(result => {
        console.log('Create Success');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const createInventoryCountItem = (inventoryCartID, product) => {
    API.graphql(
      graphqlOperation(mutations.createInventoryCountItems, {
        input: {
          inventoryCartID: inventoryCartID,
          productID: product.id,
          quantityLeft: [0]
        }
      })
    )
      .then(result => {
        console.log('Create Inventory Item Success');
      })
      .catch(error => {
        console.log('Create Inventory Item Failed', error);
      });
  };

  const createInventoryCountItems = inventoryCartID => {
    // list all products we will use to create inventory count items
    API.graphql(
      graphqlOperation(queries.listProductss, {
        filter: {
          location: {
            eq: props.linkProps.location.state.location
          }
        },
        limit: 2147483647
      })
    )
      .then(result => {
        let allProducts = result.data.listProductss.items;
        allProducts.map(eachProduct => {
          createInventoryCountItem(inventoryCartID, eachProduct);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const checkInventoryCarts = () => {
    API.graphql(
      graphqlOperation(queries.listInventoryCartss, {
        filter: {
          location: {
            eq: props.linkProps.location.state.location
          },
          and: { completed: { eq: false } }
        }
      })
    )
      .then(result => {
        // if there are no active inventory carts for our location, create one
        console.log(result);
        if (result.data.listInventoryCartss.items.length === 0) {
          console.log(
            'This location does NOT have an Inventory Cart, setting one up now...'
          );
          createInventoryCart();
        } else {
          // there should only be ONE active inventoryCartID active (completed = false) at a time
          console.log(
            'This location HAS an active inventory cart, setting up table now...'
          );
          let inventoryCartID = result.data.listInventoryCartss.items[0].id;
          checkInventoryCountItems(inventoryCartID);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getInventoryProduct = inventoryCountItem => {
    API.graphql(
      graphqlOperation(queries.getProducts, {
        id: inventoryCountItem.productID
      })
    )
      .then(result => {
        return result.data.getProducts;
        // If inventoryCountItems has not been setup yet
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Updates the inventory table; used when data is edited, deleted, or created
  const refreshInventoryItems = () => {
    dispatch({
      type: 'invCountTableLoading',
      state: true
    });
    // setTimeout(getAllProducts(), 100);
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

  const checkInventoryCountItems = inventoryCartID => {
    API.graphql(
      graphqlOperation(queries.listInventoryCountItemss, {
        filter: {
          inventoryCartID: {
            eq: inventoryCartID
          }
        },
        limit: 2147483647
      })
    )
      .then(result => {
        let inventoryCountItems = result.data.listInventoryCountItemss.items;
        let numberOfItems = inventoryCountItems.length;
        // If inventoryCountItems has not been setup yet
        if (numberOfItems === 0) {
          console.log(
            'This inventory cart does NOT have the inventory count items setup'
          );
          createInventoryCountItems(inventoryCartID);
        } else {
          let initialData = [];
          let counter = 0; // used to keep track of how many products we have retreived so far

          inventoryCountItems.map(eachInventoryItem => {
            // for each inventory item in the inventory count table, we need to get the product associated with that inventory count
            API.graphql(
              graphqlOperation(queries.getProducts, {
                id: eachInventoryItem.productID
              })
            )
              .then(result => {
                let product = result.data.getProducts;
                initialData.push(product);
                counter += 1;
                if (counter === numberOfItems) {
                  dispatch({
                    type: 'invCountTableItems',
                    state: initialData
                  });
                  dispatch({
                    type: 'invCountTableLoading',
                    state: false
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderEditable = cellInfo => {
    const newData = [...globalStore.invCountItems];
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
                type: 'invCountItems',
                state: originalData
              });
            } else {
              let results = matchSorter(
                globalStore.invCountItems,
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
                type: 'invCountItems',
                state: results
              });
            }
          }}
          onBlur={event => {
            dispatch({
              type: 'invCountItems',
              state: originalData
            });
          }}
          onFocus={event => setOriginalData(globalStore.invCountItems)}
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
        data={globalStore.invCountItems}
        getTdProps={() => {
          return {
            style: {
              overflow: 'visible',
              verticalAlign: 'middle',
              textAlign: 'center'
            }
          };
        }}
        loading={globalStore.invCountTableLoading}
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
