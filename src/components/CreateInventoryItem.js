import React, { useState, useEffect } from 'react';
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdbreact';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import 'react-table/react-table.css';
import CreatableSelect from 'react-select/creatable';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { useStateValue } from '../StateManagement';

const CreateInventoryItem = () => {
  const [globalStore, dispatch] = useStateValue();
  const [newInventoryItem, setNewInventoryItem] = useState({
    franchise: globalStore.currentFranchise,
    location: globalStore.currentLocation,
    item: null,
    itemNumber: null,
    price: null,
    storage: null,
    quantity: null,
    units: 'OZ',
    brand: null,
    supplier: null,
    parValue: null
  });

  const addNewInventoryItem = () => {
    API.graphql(
      graphqlOperation(mutations.createInventoryItem, {
        input: newInventoryItem
      })
    )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleNewStorageOption = event => {
    // if valid event (event will return NULL if selection box is closed)
    if (event) {
      // if new one is to be created
      if (event.hasOwnProperty('__isNew__')) {
        let storageOptionsCopy = [...globalStore.storageOptions];
        let eventCopy = { ...event };
        delete eventCopy.__isNew__;
        storageOptionsCopy.push(eventCopy);
        dispatch({
          type: 'storageOptions',
          state: storageOptionsCopy
        });
      }

      let newInventoryItemCopy = { ...newInventoryItem };
      newInventoryItemCopy.storage = event.value;
      setNewInventoryItem(newInventoryItemCopy);
    }
  };
  const handleNewUnitOption = event => {
    if (event) {
      // if new one is to be created
      if (event.hasOwnProperty('__isNew__')) {
        let unitOptionsCopy = [...globalStore.unitOptions];
        let eventCopy = { ...event };
        delete eventCopy.__isNew__;
        unitOptionsCopy.push(eventCopy);
        dispatch({
          type: 'unitOptions',
          state: unitOptionsCopy
        });
      }
      let newInventoryItemCopy = { ...newInventoryItem };
      newInventoryItemCopy.units = event.value;
      setNewInventoryItem(newInventoryItemCopy);
    }
  };
  const handleNewBrandOption = event => {
    if (event) {
      // if new one is to be created
      if (event.hasOwnProperty('__isNew__')) {
        let brandOptionsCopy = [...globalStore.brandOptions];
        let eventCopy = { ...event };
        delete eventCopy.__isNew__;
        brandOptionsCopy.push(eventCopy);
        dispatch({
          type: 'brandOptions',
          state: brandOptionsCopy
        });
      }
      let newInventoryItemCopy = { ...newInventoryItem };
      newInventoryItemCopy.brand = event.value;
      setNewInventoryItem(newInventoryItemCopy);
    }
  };
  const handleNewSupplierOption = event => {
    if (event) {
      // if new one is to be created
      if (event.hasOwnProperty('__isNew__')) {
        let supplierOptionsCopy = [...globalStore.supplierOptions];
        let eventCopy = { ...event };
        delete eventCopy.__isNew__;
        supplierOptionsCopy.push(eventCopy);
        dispatch({
          type: 'supplierOptions',
          state: supplierOptionsCopy
        });
      }
      let newInventoryItemCopy = { ...newInventoryItem };
      newInventoryItemCopy.supplier = event.value;
      setNewInventoryItem(newInventoryItemCopy);
    }
  };

  return (
    <MDBContainer>
      <h3 className="display-5" style={{ paddingTop: '80px' }}>
        <strong>Create New Inventory Item</strong>
      </h3>
      <hr className="my-4" />
      <div
        className="d-flex justify-content-center"
        style={{
          paddingBottom: '50px'
        }}
      >
        <form>
          <MDBInput
            label="Item Number"
            outline
            type="number"
            getValue={input => {
              let newInventoryItemCopy = { ...newInventoryItem };
              newInventoryItemCopy.itemNumber = input;
              setNewInventoryItem(newInventoryItemCopy);
            }}
          />
          <MDBInput
            label="Item Description"
            outline
            getValue={input => {
              let newInventoryItemCopy = { ...newInventoryItem };
              newInventoryItemCopy.item = input;
              setNewInventoryItem(newInventoryItemCopy);
            }}
          />
          <MDBInput
            label="Price"
            outline
            type="number"
            getValue={input => {
              let newInventoryItemCopy = { ...newInventoryItem };
              newInventoryItemCopy.price = input;
              setNewInventoryItem(newInventoryItemCopy);
            }}
          />
          <MDBRow>
            <MDBCol sm="7">
              <MDBInput
                label="Quantity"
                outline
                type="number"
                getValue={input => {
                  let newInventoryItemCopy = { ...newInventoryItem };
                  newInventoryItemCopy.quantity = input;
                  setNewInventoryItem(newInventoryItemCopy);
                }}
              />
              <MDBInput
                label="Par Value"
                outline
                type="number"
                getValue={input => {
                  let newInventoryItemCopy = { ...newInventoryItem };
                  newInventoryItemCopy.parValue = input;
                  setNewInventoryItem(newInventoryItemCopy);
                }}
              />
            </MDBCol>
            <MDBCol sm="5">
              <label className="grey-text">Units</label>
              <CreatableSelect
                isClearable
                onChange={e => handleNewUnitOption(e)}
                options={globalStore.unitOptions}
                placeholder={'OZ'}
              />
            </MDBCol>
          </MDBRow>
          <br />
          <label className="grey-text">Storage</label>
          <CreatableSelect
            isClearable
            onChange={e => handleNewStorageOption(e)}
            options={globalStore.storageOptions}
            placeholder={'Select/Type Storage'}
          />
          <br />
          <label className="grey-text">Brand</label>
          <CreatableSelect
            isClearable
            onChange={e => handleNewBrandOption(e)}
            options={globalStore.brandOptions}
            placeholder={'Select/Type Brand'}
          />
          <br />
          <label className="grey-text">Supplier</label>
          <CreatableSelect
            isClearable
            onChange={e => handleNewSupplierOption(e)}
            options={globalStore.supplierOptions}
            placeholder={'Select/Type Supplier'}
          />

          <div className="text-center mt-4">
            <MDBBtn color="primary" onClick={() => addNewInventoryItem()}>
              Create Item
            </MDBBtn>
          </div>
        </form>
      </div>
    </MDBContainer>
  );
};

export default CreateInventoryItem;
