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

const TableModal = props => {
  const [modal, setModal] = useState(false);
  return (
    <MDBContainer style={{ paddingBottom: '20px' }}>
      <div className="d-flex justify-content-center">
        <MDBBtn
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
            <EditableTable />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => {
                setModal(!modal);
              }}
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    </MDBContainer>
  );
};

export default TableModal;
