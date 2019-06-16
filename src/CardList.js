import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Card from './Card';
import Loader from 'react-loader-spinner';

const CardList = props => {
  const zoneInfoObject = props.zoneInfoObject;
  console.log(zoneInfoObject);
  if (Object.keys(zoneInfoObject).length > 0) {
    const names = Object.keys(zoneInfoObject);
    const cardList = names.map(name => (
      <MDBCol key={name} style={{ paddingTop: '40px', paddingBottom: '20px' }}>
        <Card location={zoneInfoObject[name]} name={name} />
      </MDBCol>
    ));

    return <MDBRow>{cardList}</MDBRow>;
  }

  return <Loader type="Puff" color="#00BFFF" height="100" width="100" />;
};

export default CardList;
