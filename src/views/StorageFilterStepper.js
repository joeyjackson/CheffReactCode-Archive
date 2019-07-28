import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBAnimation,
  MDBCard,
  MDBCardBody,
  MDBCardImage
} from 'mdbreact';
import { useStateValue } from '../state/StateManagement';

import dryGoods from '../assets/img/food/dryGoods.jpg';
import cleaningSupplies from '../assets/img/food/packagingCleaning.jpg';
import produce from '../assets/img/food/produce.jpg';
import dairy from '../assets/img/food/dairy.jpg';
import protein from '../assets/img/food/protein.jpg';

const StorageFilterStepper = props => {
  const [globalStore, dispatch] = useStateValue();
  console.log(globalStore.storageFilter);
  return (
    <>
      <div
        className="d-flex justify-content-between flex-wrap bd-highlight example-parent"
        style={{ paddingBottom: '50px' }}
      >
        {globalStore.storageFilter.dryGoods ? (
          <MDBAnimation type="pulse" infinite duration="2s">
            <MDBBtn
              size="lg"
              color="primary"
              flat
              onClick={() => {
                let currentStorageFilter = globalStore.storageFilter;
                currentStorageFilter.dryGoods = false;
                dispatch({
                  type: 'storageFilter',
                  state: currentStorageFilter
                });
              }}
            >
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage className="img-fluid" src={dryGoods} waves />
                <MDBCardBody>
                  <h6>Dry Goods</h6>
                </MDBCardBody>
              </MDBCard>
            </MDBBtn>
          </MDBAnimation>
        ) : (
          <MDBBtn
            size="lg"
            outline
            flat
            color="primary"
            onClick={() => {
              let currentStorageFilter = globalStore.storageFilter;
              currentStorageFilter.dryGoods = true;
              dispatch({
                type: 'storageFilter',
                state: currentStorageFilter
              });
            }}
          >
            <MDBCard style={{ width: '18rem' }}>
              <MDBCardImage className="img-fluid" src={dryGoods} waves />
              <MDBCardBody>
                <h6>Dry Goods</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBBtn>
        )}

        {globalStore.storageFilter.packagingPaperCleaning ? (
          <MDBAnimation type="pulse" infinite duration="2s">
            <MDBBtn
              size="lg"
              color="primary"
              flat
              onClick={() => {
                let currentStorageFilter = globalStore.storageFilter;
                currentStorageFilter.packagingPaperCleaning = false;
                dispatch({
                  type: 'storageFilter',
                  state: currentStorageFilter
                });
              }}
            >
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage
                  className="img-fluid"
                  src={cleaningSupplies}
                  waves
                />
                <MDBCardBody>
                  <h6>Packaging/Paper/Cleaning</h6>
                </MDBCardBody>
              </MDBCard>
            </MDBBtn>
          </MDBAnimation>
        ) : (
          <MDBBtn
            size="lg"
            outline
            flat
            color="primary"
            onClick={() => {
              let currentStorageFilter = globalStore.storageFilter;
              currentStorageFilter.packagingPaperCleaning = true;
              dispatch({
                type: 'storageFilter',
                state: currentStorageFilter
              });
            }}
          >
            <MDBCard style={{ width: '18rem' }}>
              <MDBCardImage
                className="img-fluid"
                src={cleaningSupplies}
                waves
              />
              <MDBCardBody>
                <h6>Packaging/Paper/Cleaning</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBBtn>
        )}

        {globalStore.storageFilter.produce ? (
          <MDBAnimation type="pulse" infinite duration="2s">
            <MDBBtn
              size="lg"
              color="primary"
              flat
              onClick={() => {
                let currentStorageFilter = globalStore.storageFilter;
                currentStorageFilter.produce = false;
                dispatch({
                  type: 'storageFilter',
                  state: currentStorageFilter
                });
              }}
            >
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage className="img-fluid" src={produce} waves />
                <MDBCardBody>
                  <h6>Produce</h6>
                </MDBCardBody>
              </MDBCard>
            </MDBBtn>
          </MDBAnimation>
        ) : (
          <MDBBtn
            size="lg"
            outline
            flat
            color="primary"
            onClick={() => {
              let currentStorageFilter = globalStore.storageFilter;
              currentStorageFilter.produce = true;
              dispatch({
                type: 'storageFilter',
                state: currentStorageFilter
              });
            }}
          >
            <MDBCard style={{ width: '18rem' }}>
              <MDBCardImage className="img-fluid" src={produce} waves />
              <MDBCardBody>
                <h6>Produce</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBBtn>
        )}

        {globalStore.storageFilter.dairy ? (
          <MDBAnimation type="pulse" infinite duration="2s">
            <MDBBtn
              size="lg"
              color="primary"
              flat
              onClick={() => {
                let currentStorageFilter = globalStore.storageFilter;
                currentStorageFilter.dairy = false;
                dispatch({
                  type: 'storageFilter',
                  state: currentStorageFilter
                });
              }}
            >
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage className="img-fluid" src={dairy} waves />
                <MDBCardBody>
                  <h6>Dairy</h6>
                </MDBCardBody>
              </MDBCard>
            </MDBBtn>
          </MDBAnimation>
        ) : (
          <MDBBtn
            size="lg"
            flat
            color="primary"
            onClick={() => {
              let currentStorageFilter = globalStore.storageFilter;
              currentStorageFilter.dairy = true;
              dispatch({
                type: 'storageFilter',
                state: currentStorageFilter
              });
            }}
          >
            <MDBCard style={{ width: '18rem' }}>
              <MDBCardImage className="img-fluid" src={dairy} waves />
              <MDBCardBody>
                <h6>Dairy</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBBtn>
        )}

        {globalStore.storageFilter.protein ? (
          <MDBAnimation type="pulse" infinite duration="2s">
            <MDBBtn
              size="lg"
              color="primary"
              flat
              onClick={() => {
                let currentStorageFilter = globalStore.storageFilter;
                currentStorageFilter.protein = false;
                dispatch({
                  type: 'storageFilter',
                  state: currentStorageFilter
                });
              }}
            >
              <MDBCard style={{ width: '18rem' }}>
                <MDBCardImage className="img-fluid" src={protein} waves />
                <MDBCardBody>
                  <h6>Protein</h6>
                </MDBCardBody>
              </MDBCard>
            </MDBBtn>
          </MDBAnimation>
        ) : (
          <MDBBtn
            size="lg"
            flat
            color="primary"
            onClick={() => {
              let currentStorageFilter = globalStore.storageFilter;
              currentStorageFilter.protein = true;
              dispatch({
                type: 'storageFilter',
                state: currentStorageFilter
              });
            }}
          >
            <MDBCard style={{ width: '18rem' }}>
              <MDBCardImage className="img-fluid" src={protein} waves />
              <MDBCardBody>
                <h6>Protein</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBBtn>
        )}
      </div>

      <div className="d-flex justify-content-around">
        <Link
          to={{
            pathname: '/'
          }}
        >
          <MDBBtn color="primary" rounded>
            <i className="material-icons">navigate_before</i>
          </MDBBtn>
        </Link>
        <Link
          to={{
            pathname: `/location/inventory/${props.location}`,
            state: {
              location: props.location,
              franchise: props.franchise
            }
          }}
        >
          <MDBBtn color="primary" rounded>
            <i className="material-icons">navigate_next</i>
          </MDBBtn>
        </Link>
      </div>
    </>
  );
};

export default StorageFilterStepper;
