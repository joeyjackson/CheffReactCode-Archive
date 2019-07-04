import React, { useState, Fragment } from 'react';
import { MDBContainer, MDBJumbotron, MDBBtn } from 'mdbreact';
import EditableTable from './EditableTable';
import StorageFilterStepper from './StorageFilterStepper';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useStateValue } from '../StateManagement';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const InventoryTable = props => {
  console.log(props);
  const [viewing, setViewing] = useState('storage');

  const [currentFilterState, dispatch] = useStateValue();

  return (
    <MDBContainer style={{ paddingBottom: '20px', paddingTop: '50px' }}>
      <h5 className="text-center">
        <b>{props.location}</b>
      </h5>

      {/* <EditableTable location={props.location} franchise="Tacobell" /> */}
      {viewing === 'storage' && <StorageFilterStepper />}
      {viewing === 'table' && (
        <EditableTable location={props.location} franchise="Tacobell" />
      )}
      <div
        className="d-inline-flex justify-content-around"
        style={{ width: '100%' }}
      >
        {viewing !== 'storage' && (
          <MDBBtn
            className="align-self-start"
            color="blue-grey"
            rounded
            onClick={() => {
              setViewing('storage');
            }}
          >
            Back
          </MDBBtn>
        )}
        {viewing === 'storage' && (
          <Fragment>
            <MDBBtn
              color="primary"
              rounded
              className="order-2"
              onClick={() => {
                let count = 0;
                let filterStateKeys = Object.keys(currentFilterState);
                filterStateKeys.map(eachStorageType => {
                  console.log(currentFilterState);
                  console.log(currentFilterState[eachStorageType]);
                  if (!currentFilterState[eachStorageType]) {
                    count += 1;
                  }
                });
                if (count === 4) {
                  confirmAlert({
                    customUI: ({ onClose }) => {
                      return (
                        <div className="custom-ui">
                          <MDBJumbotron className="text-center">
                            <h1 style={{ paddingBottom: '20px' }}>
                              Invalid Request
                            </h1>
                            <p style={{ fontSize: '20px' }}>
                              You must select at least 1 option.
                            </p>
                            <MDBBtn color="primary" onClick={onClose}>
                              Gotcha
                            </MDBBtn>
                          </MDBJumbotron>
                        </div>
                      );
                    }
                  });
                } else {
                  setViewing('table');
                }
              }}
            >
              Next
            </MDBBtn>
            <Link exact to="/">
              <MDBBtn className="order-1" color="blue-grey" rounded>
                Back
              </MDBBtn>
            </Link>
          </Fragment>
        )}

        {viewing === 'table' && (
          <Link exact to="/">
            <MDBBtn color="primary" rounded>
              Done
            </MDBBtn>
          </Link>
        )}
      </div>
    </MDBContainer>
  );
};

export default InventoryTable;
