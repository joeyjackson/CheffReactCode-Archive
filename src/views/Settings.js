import React from 'react';
import { withRouter } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { useStateValue } from '../StateManagement';

const Settings = (props) => {
    const [globalStore, dispatch] = useStateValue();

    const locations = globalStore.franchiseLocations.length > 0 ?
        globalStore.franchiseLocations.map(eachLocation =>
            (<MDBRow>{eachLocation.franchise + ": " + eachLocation.location}</MDBRow>)) : <MDBRow>None</MDBRow>;
    const units = globalStore.unitOptions.length > 0 ?
        globalStore.unitOptions.map(unit => (<MDBRow>{unit.label}</MDBRow>)) : <MDBRow>None</MDBRow>;
    const brands = globalStore.brandOptions.length > 0 ?
        globalStore.brandOptions.map(brand => (<MDBRow>{brand}</MDBRow>)) : <MDBRow>None</MDBRow>;

    return (
        <MDBContainer
            style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <MDBRow>
                <strong>Settings</strong>
            </MDBRow>
            <MDBCol>
                <MDBRow>User Information</MDBRow>
                <MDBCol><MDBRow>{"Email: " + globalStore.userEmail}</MDBRow></MDBCol>
                <MDBRow>Franchise Locations</MDBRow>
                <MDBCol>{locations}</MDBCol>
                <MDBRow>Brands</MDBRow>
                <MDBCol>{brands}</MDBCol>
                <MDBRow>Units</MDBRow>
                <MDBCol>{units}</MDBCol>
            </MDBCol>
            <MDBRow>
                <MDBBtn color="back" rounded onClick={() => props.history.goBack()}>
                    Back
                </MDBBtn>
            </MDBRow>
        </MDBContainer>
    );
}

export default withRouter(Settings);