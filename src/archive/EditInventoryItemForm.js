import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { API, graphqlOperation } from 'aws-amplify';
import 'react-table/react-table.css';
import CreatableSelect from 'react-select/creatable';
import * as mutations from '../../api/graphql/mutations';
import { useStateValue } from '../../state/StateManagement';

const EditInventoryItemForm = () => {
  const [globalStore, dispatch] = useStateValue();
  const [newInventoryItem, setNewInventoryItem] = useState({
    franchise: globalStore.inventoryItemToUpdate.franchise,
    id: globalStore.inventoryItemToUpdate.id,
    location: globalStore.inventoryItemToUpdate.location,
    item: globalStore.inventoryItemToUpdate.item,
    itemNumber: globalStore.inventoryItemToUpdate.itemNumber,
    price: globalStore.inventoryItemToUpdate.price,
    storage: globalStore.inventoryItemToUpdate.storage,
    quantity: globalStore.inventoryItemToUpdate.quantity,
    units: globalStore.inventoryItemToUpdate.units,
    brand: globalStore.inventoryItemToUpdate.brand,
    supplier: globalStore.inventoryItemToUpdate.supplier,
    parValue: globalStore.inventoryItemToUpdate.parValue
  });

  console.log(globalStore.inventoryItemToUpdate);

  const updateInventoryItem = item => {
    console.log(item);
    if ('__typename' in item) {
      delete item.__typename;
    }
    // API.graphql(
    //   graphqlOperation(mutations.updateInventoryItem, {
    //     input: item
    //   })
    // )
    //   .then(result => {
    //     console.log(result);
    //     // refreshInventoryItems();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
            valueDefault={newInventoryItem.itemNumber}
            getValue={input => {
              let newInventoryItemCopy = { ...newInventoryItem };
              newInventoryItemCopy.itemNumber = input;
              setNewInventoryItem(newInventoryItemCopy);
            }}
          />
          <MDBInput
            label="Item Description"
            outline
            valueDefault={newInventoryItem.item}
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
            valueDefault={newInventoryItem.price}
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
                valueDefault={newInventoryItem.quantity}
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
                valueDefault={newInventoryItem.parValue}
                getValue={input => {
                  let newInventoryItemCopy = { ...newInventoryItem };
                  newInventoryItemCopy.parValue = input;
                  setNewInventoryItem(newInventoryItemCopy);
                }}
              />
            </MDBCol>
            <MDBCol sm="5">
              <label className="grey-text">
                <strong>Units</strong>
              </label>
              <CreatableSelect
                isClearable
                isSearchable
                placeholder={newInventoryItem.units}
                onChange={e => handleNewUnitOption(e)}
                options={globalStore.unitOptions}
              />
            </MDBCol>
          </MDBRow>
          <br />
          <label className="grey-text">
            <strong>Storage</strong>
          </label>
          <CreatableSelect
            isClearable
            isSearchable
            placeholder={newInventoryItem.storage}
            onChange={e => handleNewStorageOption(e)}
            options={globalStore.storageOptions}
          />
          <br />
          <label className="grey-text">
            <strong>Brand</strong>
          </label>
          <CreatableSelect
            isClearable
            isSearchable
            placeholder={newInventoryItem.brand}
            onChange={e => handleNewBrandOption(e)}
            options={globalStore.brandOptions}
          />
          <br />
          <label className="grey-text">
            <strong>Supplier</strong>
          </label>
          <CreatableSelect
            isClearable
            isSearchable
            placeholder={newInventoryItem.supplier}
            onChange={e => handleNewSupplierOption(e)}
            options={globalStore.supplierOptions}
          />

          <div className="text-center mt-4">
            <MDBBtn
              color="primary"
              onClick={() => {
                updateInventoryItem(newInventoryItem);
              }}
            >
              Update Item
            </MDBBtn>
          </div>
        </form>
      </div>
    </MDBContainer>
  );
};

export default EditInventoryItemForm;
