import React, { useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Card from './Card';
import Loader from 'react-loader-spinner';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useStateValue } from '../StateManagement';

const CardList = () => {
  const [globalStore, dispatch] = useStateValue();

  const cardList = globalStore.franchiseLocations.map(eachLocation => (
    <MDBCol
      key={eachLocation.location}
      lg="4"
      md="6"
      style={{ paddingTop: '50px', paddingBottom: '50px' }}
    >
      <Link
        to={{
          pathname: `/location/storageFilter/${eachLocation.location}`,
          state: {
            location: eachLocation.location,
            franchise: eachLocation.franchise
          }
        }}
      >
        <div className="d-flex justify-content-center">
          <Card
            location={eachLocation.location}
            name={eachLocation.franchise}
            latitude={eachLocation.latitude}
            longitude={eachLocation.longitude}
          />
        </div>
      </Link>
    </MDBCol>
  ));

  return <MDBRow>{cardList}</MDBRow>;
};

export default CardList;
