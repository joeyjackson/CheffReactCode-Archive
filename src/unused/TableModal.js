import React, { useState } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

import EditableTable from './EditableTable';
import StorageFilterStepper from './StorageFilterStepper';
import { useStateValue } from '../state/StateManagement';
import { useAlert } from 'react-alert';

const TableModal = props => {
  const alert = useAlert();
  const [modal, setModal] = useState(false);
  const [viewing, setViewing] = useState('storage');

  const [currentFilterState, dispatch] = useStateValue();

  return (
    <MDBContainer style={{ paddingBottom: '20px' }}>
      <view className="d-flex justify-content-center">
        <MDBBtn
          color="primary"
          rounded
          onClick={() => {
            setModal(!modal);
          }}
        >
          Select Location
        </MDBBtn>
        <MDBModal
          isOpen={modal}
          toggle={() => {
            setModal(!modal);
          }}
          size="lg"
        >
          <MDBModalHeader
            toggle={() => {
              setModal(!modal);
            }}
          >
            <h5 className="text-center">{props.location}</h5>
          </MDBModalHeader>
          <MDBModalBody>
            {/* <EditableTable location={props.location} franchise="Tacobell" /> */}
            {viewing === 'storage' && <StorageFilterStepper />}
            {viewing === 'table' && (
              <EditableTable location={props.location} franchise="Tacobell" />
            )}
          </MDBModalBody>
          <MDBModalFooter>
            {viewing !== 'storage' && (
              <view
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'left',
                  alignItems: 'left'
                }}
              >
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
              </view>
            )}
            {viewing === 'storage' && (
              <MDBBtn
                color="primary"
                rounded
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
                  } else {
                    setViewing('table');
                  }
                }}
              >
                Next
              </MDBBtn>
            )}

            {viewing === 'table' && (
              <MDBBtn
                color="primary"
                rounded
                onClick={() => {
                  setViewing('storage');
                  setModal(!modal);
                }}
              >
                Done
              </MDBBtn>
            )}
          </MDBModalFooter>
        </MDBModal>
      </view>
    </MDBContainer>
  );
};

export default TableModal;
