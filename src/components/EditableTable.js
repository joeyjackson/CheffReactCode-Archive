import React, { useState, useEffect, Fragment } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import MaterialTable from 'material-table';
import Loader from 'react-loader-spinner';
import useIsMounted from 'ismounted';
import awsconfig from '../aws-exports.js';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBFormInline,
  MDBRow,
  MDBCol
} from 'mdbreact';

import { useStateValue } from '../StateManagement';

import { useAlert } from 'react-alert';

import './Custom.css';

var jsPDF = require('jspdf');
require('jspdf-autotable');

const uuidv1 = require('uuid/v1');
var _ = require('underscore');

const storageTypes = {
  options: [
    { checked: false, value: 'Dry Storage', text: 'Dry Storage' },
    { checked: false, value: 'Cold Storage', text: 'Cold Storage' },
    { checked: false, value: 'Freezer', text: 'Freezer' },
    { checked: false, value: 'Low Velocity', text: 'Low Velocity' }
  ]
};

const categoryTypes = {
  options: [
    {
      checked: false,
      value: 'Meats and Poultry',
      text: 'Meats and Poultry'
    },
    {
      checked: false,
      value: 'Dairy',
      text: 'Dairy'
    },
    {
      checked: false,
      value: 'Grain',
      text: 'Grain'
    },
    {
      checked: false,
      value: 'Vegetables',
      text: 'Vegetables'
    },
    {
      checked: false,
      value: 'Fruits',
      text: 'Fruits'
    },
    {
      checked: false,
      value: 'Beverages',
      text: 'Beverages'
    }
  ]
};

const convertDateTime = AWSDateTime => {
  return AWSDateTime.slice(0, 10);
};

const didUpdate = (oldData, newData) => {
  const oldDataCopy = Object.assign({}, oldData);
  const newDataCopy = Object.assign({}, newData);
  delete oldDataCopy['tableData'];
  delete newDataCopy['tableData'];
  return !_.isEqual(oldDataCopy, newDataCopy);
};

export default function MaterialTableDemo(props) {
  const [storageFilter, dispatch] = useStateValue();
  const [currentFilters, setCurrentFilters] = useState({ options: [] });
  const alert = useAlert();
  const columns = [
    // {
    //   title: 'Category',
    //   field: 'category',
    //   editComponent: props => (
    //     <MDBSelect
    //       className="test"
    //       options={categoryTypes.options}
    //       selected={props.rowData.category}
    //       getTextContent={value => {
    //         props.rowData.category = value;
    //       }}
    //     />
    //   )
    // },
    { title: 'Item', field: 'item', filtering: false },
    { title: 'Quantity', field: 'quantity', filtering: false },
    {
      title: 'Storage',
      field: 'storage',
      filtering: false,
      editComponent: props => (
        <MDBSelect
          className="test"
          options={currentFilters.options}
          selected={props.rowData.storage}
          getTextContent={value => {
            props.rowData.storage = value;
          }}
        />
      )
    }
    // { title: 'Date', field: 'updatedAt', editable: 'never', filtering: false },
    // { title: 'Par Value', field: 'parValue', filtering: false }
  ];

  const pushChanges = () => {
    new Promise(resolve => {
      setTimeout(() => {
        data.map(eachItem => {
          console.log(eachItem);
          if ('CUDHistory' in eachItem) {
            const eachItemCopy = Object.assign({}, eachItem);
            delete eachItemCopy['tableData'];
            delete eachItem['CUDHistory'];
            eachItemCopy.franchise = props.franchise;
            eachItemCopy.location = props.location;
            const ts = new Date();
            eachItemCopy.updatedAt = ts.toISOString();

            switch (eachItemCopy.CUDHistory) {
              case 'C':
                delete eachItemCopy['CUDHistory'];
                createItem(eachItemCopy);
                break;
              case 'U':
                delete eachItemCopy['CUDHistory'];
                updateItem(eachItemCopy);
                break;
              default:
                break;
            }
            resolve();
          }
        });
      }, 600);
    });
  };

  const [data, setData] = useState([], pushChanges());
  // const [storageFilter, setStorageFilter] = useState([], () =>
  //   console.log('changed filter')
  // );
  // const [categoryFilter, setCategoryFilter] = useState([], () =>
  //   console.log('changed filter')
  // );

  const isMounted = useIsMounted();

  const generateSupplyOrder = () => {
    if (data.length > 0) {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text(20, 20, 'Supply Order Form'); //title
      doc.text(20, 30, data[0].franchise);
      doc.setFontSize(15);
      doc.text(20, 40, data[0].location);

      let body = [];
      data.map(eachData => {
        body.push([
          eachData.category,
          eachData.item,
          eachData.storage,
          eachData.updatedAt,
          eachData.parValue
        ]);
      });

      doc.autoTable({
        startY: 70,
        theme: 'grid',
        head: [['Category', 'Item', 'Storage', 'Date', 'Par Value']],
        body: body
      });

      doc.save('table.pdf');
    }
  };

  const createItem = Item => {
    API.graphql(
      graphqlOperation(mutations.createInventoryItem, {
        input: Item
      })
    )
      .then(result => {
        alert.show('Create Success!', {
          timeout: 2000, // custom timeout just for this one alert
          type: 'success'
        });
      })
      .catch(err => console.log(err));
  };

  const updateItem = Item => {
    API.graphql(
      graphqlOperation(mutations.updateInventoryItem, {
        input: Item
      })
    )
      .then(result => {
        alert.show('Update Success!', {
          timeout: 2000, // custom timeout just for this one alert
          type: 'success'
        });
      })
      .catch(err => console.log(err));
  };

  const deleteItem = ItemID => {
    API.graphql(
      graphqlOperation(mutations.deleteInventoryItem, {
        input: { id: ItemID }
      })
    )
      .then(result => {
        alert.show('Delete Success!', {
          timeout: 2000, // custom timeout just for this one alert
          type: 'success'
        });
      })
      .catch(err => console.log(err));
  };

  const listItems = () => {
    let storageKeys = Object.keys(storageFilter);
    let tempStorageFilter = [];
    let tempCurrentFilters = { options: [] };
    storageKeys.map(eachKey => {
      switch (eachKey) {
        case 'dryStorage':
          if (storageFilter[eachKey]) {
            tempStorageFilter.push({ storage: { eq: 'Dry Storage' } });
            tempCurrentFilters.options.push({
              checked: false,
              value: 'Dry Storage',
              text: 'Dry Storage'
            });
          }

          break;
        case 'coldStorage':
          if (storageFilter[eachKey]) {
            tempStorageFilter.push({ storage: { eq: 'Cold Storage' } });
            tempCurrentFilters.options.push({
              checked: false,
              value: 'Cold Storage',
              text: 'Cold Storage'
            });
          }
          break;
        case 'freezer':
          if (storageFilter[eachKey]) {
            tempStorageFilter.push({ storage: { eq: 'Freezer' } });
            tempCurrentFilters.options.push({
              checked: false,
              value: 'Freezer',
              text: 'Freezer'
            });
          }
          break;
        case 'lowVelocity':
          if (storageFilter[eachKey]) {
            tempStorageFilter.push({ storage: { eq: 'Low Velocity' } });
            tempCurrentFilters.options.push({
              checked: false,
              value: 'Low Velocity',
              text: 'Low Velocty'
            });
          }
          break;
        default:
          break;
      }
    });

    let initialData = [];
    console.log(tempStorageFilter);

    API.graphql(
      graphqlOperation(queries.listInventoryItems, {
        filter: {
          location: {
            eq: props.location
          },
          or: tempStorageFilter
        }
      })
    )
      .then(result => {
        console.log(result);
        let resultCopy = result.data.listInventoryItems.items;

        resultCopy.map(eachItem => {
          eachItem['updatedAt'] = convertDateTime(eachItem['updatedAt']);
        });

        resultCopy.map(eachItem => {
          initialData.push(eachItem);
        });

        console.log(initialData);
        console.log(tempCurrentFilters);
        if (initialData.length > 0) {
          alert.show('Data Received', {
            timeout: 2000, // custom timeout just for this one alert
            type: 'success'
          });

          setData(initialData);
          setCurrentFilters(tempCurrentFilters);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    isMounted.current && listItems();
  }, []);

  return (
    <Fragment>
      <MaterialTable
        title="Inventory Table"
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => {
              listItems();
            }
          }
        ]}
        columns={columns}
        data={data}
        options={{ search: true, filtering: true }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                const originalData = [...data];
                originalData.push(newData);
                newData.id = uuidv1();
                newData.CUDHistory = 'C';
                const ts = new Date();
                newData.updatedAt = convertDateTime(ts.toISOString());
                console.log('new data');
                setData(originalData);
                resolve();
              }, 200);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              if (didUpdate(oldData, newData)) {
                setTimeout(() => {
                  const originalData = [...data];

                  if (!('CUDHistory' in oldData)) {
                    newData.CUDHistory = 'U';
                  }
                  const ts = new Date();
                  newData.updatedAt = convertDateTime(ts.toISOString());
                  originalData[originalData.indexOf(oldData)] = newData;
                  console.log('update data');
                  setData(originalData);

                  resolve();
                }, 200);
              } else {
                resolve();
              }
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                const originalData = [...data];
                deleteItem(oldData.id);
                originalData.splice(originalData.indexOf(oldData), 1);
                console.log('delete data');
                setData(originalData);
                resolve();
              }, 200);
            })
        }}
      />
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: '30px' }}
      >
        <MDBBtn
          color="primary"
          onClick={() => {
            generateSupplyOrder();
          }}
        >
          Generate Supply Order
        </MDBBtn>
      </div>
    </Fragment>
  );

  //   return <Loader type="Puff" color="#00BFFF" height="100" width="100" />;
}
