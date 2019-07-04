import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAnimation } from 'mdbreact';
import { useStateValue } from '../StateManagement';

const StorageFilterStepper = () => {
  const [storage, dispatch] = useStateValue();

  return (
    <MDBContainer style={{ paddingTop: '50px', paddingBottom: '50px' }}>
      <MDBRow>
        <MDBCol className="text-center">
          {storage.dryStorage ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() =>
                  dispatch({
                    type: 'dryStorage',
                    state: false
                  })
                }
              >
                Dry Storage
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() =>
                dispatch({
                  type: 'dryStorage',
                  state: true
                })
              }
            >
              Dry Storage
            </MDBBtn>
          )}
        </MDBCol>

        <MDBCol className="text-center">
          {storage.coldStorage ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() =>
                  dispatch({
                    type: 'coldStorage',
                    state: false
                  })
                }
              >
                Cold Storage
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() =>
                dispatch({
                  type: 'coldStorage',
                  state: true
                })
              }
            >
              Cold Storage
            </MDBBtn>
          )}
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol className="text-center">
          {storage.freezer ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() =>
                  dispatch({
                    type: 'freezer',
                    state: false
                  })
                }
              >
                Freezer
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() =>
                dispatch({
                  type: 'freezer',
                  state: true
                })
              }
            >
              Freezer
            </MDBBtn>
          )}
        </MDBCol>
        <MDBCol className="text-center">
          {storage.lowVelocity ? (
            <MDBAnimation type="pulse" infinite>
              <MDBBtn
                size="lg"
                color="primary"
                onClick={() =>
                  dispatch({
                    type: 'lowVelocity',
                    state: false
                  })
                }
              >
                Low Velocity
              </MDBBtn>
            </MDBAnimation>
          ) : (
            <MDBBtn
              size="lg"
              outline
              color="primary"
              onClick={() =>
                dispatch({
                  type: 'lowVelocity',
                  state: true
                })
              }
            >
              Low Velocity
            </MDBBtn>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default StorageFilterStepper;
