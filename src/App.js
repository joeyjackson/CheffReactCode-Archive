import React, { useState, useEffect, Fragment } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { StateProvider } from './StateManagement.js';
import { reducer } from './reducer';
import awsconfig from './aws-exports';
import gql from 'graphql-tag';
import EmbededMaps from './EmbededMaps';
import IdleTimer from 'react-idle-timer';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import {
  withAuthenticator,
  SignIn,
  Greetings,
  ConfirmSignIn,
  TOTPSetup,
  ForgotPassword,
  Loading,
  RequireNewPassword,
  VerifyContact
} from 'aws-amplify-react'; // or 'aws-amplify-react-native';

import CardList from './CardList';
import Table from './components/tables/editable';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import useIsMounted from 'ismounted';
import TestTable from './TestTable';
import SearchBar from './components/SearchBar';
import './App.css';

Amplify.configure(awsconfig);

new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

let tacobellAddresses = {};

const App = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'dryStorage':
        return {
          ...state,
          dryStorage: action.state
        };

      case 'coldStorage':
        return {
          ...state,
          coldStorage: action.state
        };

      case 'freezer':
        return {
          ...state,
          freezer: action.state
        };

      case 'lowVelocity':
        return {
          ...state,
          lowVelocity: action.state
        };

      default:
        return state;
    }
  };

  const initialFilterState = {
    dryStorage: false,
    coldStorage: false,
    freezer: false,
    lowVelocity: false
  };

  const signOut = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));

    // By doing this, you are revoking all the auth tokens(id token, access token and refresh token)
    // which means the user is signed out from all the devices
    // Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)
    Auth.signOut({ global: true })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };
  tacobellAddresses = {
    Tacobell: 'Taco Bell, San Mateo Boulevard Northeast, Albuquerque, NM, USA',
    Tacobell2: '3595 Biscayne Blvd, Miami, FL 33137',
    McDonalds: '1105 Northside Dr NW, Atlanta, GA 30318'
  };

  Auth.currentUserInfo().then(data => console.log(data));
  return (
    <StateProvider initialState={initialFilterState} reducer={reducer}>
      <MDBContainer>
        <IdleTimer
          element={document}
          onActive={() => {
            console.log('user is active');
          }}
          onIdle={() => {
            signOut();
          }}
          debounce={250}
          timeout={30 * 1000 * 60}
        />
        <MDBContainer>
          <CardList zoneInfoObject={tacobellAddresses} />;{/* <TestTable /> */}
        </MDBContainer>
        <SearchBar />
      </MDBContainer>
    </StateProvider>
  );
};

export default withAuthenticator(App, {
  includeGreetings: true,
  authenticatorComponents: [
    <Greetings />,
    <ConfirmSignIn />,
    <TOTPSetup />,
    <ForgotPassword />,
    <Loading />,
    <RequireNewPassword />,
    <VerifyContact />,
    <SignIn />
  ]
});

// const addItem = () =>
//   API.graphql(
//     graphqlOperation(mutations.createInventoryItem, { input: itemDetails })
//   )
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// addItem();

// const [locations, setLocations] = useState({
//   id: 1,
//   lat: 50,
//   lng: 25.3,
//   show: true,
//   name: 'Loading Location...'
// });

// Configure a custom GraphQL endpoint
// Amplify.configure({
//   API: {
//     graphql_endpoint: awsconfig.aws_appsync_graphqlEndpoint,
//     graphql_endpoint_iam_region: 'us-east-2'
//   }
// });
