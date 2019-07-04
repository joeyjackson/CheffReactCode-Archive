import React, { useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Card from './Card';
import Loader from 'react-loader-spinner';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useStateValue } from '../StateManagement';

const CardList = props => {
  const zoneInfoObject = props.zoneInfoObject;

  // console.log(props);
  if (Object.keys(zoneInfoObject).length > 0) {
    const names = Object.keys(zoneInfoObject);
    const cardList = names.map(name => (
      <MDBCol
        key={name}
        sm="6"
        style={{ paddingTop: '50px', paddingBottom: '50px' }}
      >
        <Link
          to={{
            pathname: `/location/${name}`,
            state: {
              location: zoneInfoObject[name]
            }
          }}
        >
          <div className="d-flex justify-content-center">
            <Card location={zoneInfoObject[name]} name={name} />
          </div>
        </Link>
      </MDBCol>
    ));

    return <MDBRow>{cardList}</MDBRow>;
  }

  return <Loader type="Puff" color="#00BFFF" height="100" width="100" />;
};

export default CardList;
