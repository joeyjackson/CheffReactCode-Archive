import React, { useState, useEffect } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { StateProvider, useStateValue } from './StateManagement.js';
import { reducer } from './reducer';
import awsconfig from './aws-exports';
import gql from 'graphql-tag';
import EmbededMaps from './EmbededMaps';

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

Amplify.configure(awsconfig);
let tacobellAddresses = {};

new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

const App = () => {
  const [zoneInfo, setZoneInfo] = useState([]);
  const isMounted = useIsMounted();

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   // Get current user info
  //   console.log('mounted');
  //   const getUserInfo = () => {
  //     Auth.currentUserInfo()
  //       .then(async data => {
  //         if (isMounted.current) {
  //           console.log('setting zone');
  //           await setZoneInfo(data.attributes.zoneinfo.split(','));
  //           console.log(zoneInfo);
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   };

  //   getUserInfo();

  //   // Handle cleanup
  //   // return abortController.abort();
  //   return console.log('unmounted');
  // }, []);

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
    'Tacobell 1':
      'Taco Bell, San Mateo Boulevard Northeast, Albuquerque, NM, USA',
    'Tacobell 2': '3595 Biscayne Blvd, Miami, FL 33137',
    'McDonalds 3': '1105 Northside Dr NW, Atlanta, GA 30318'
  };

  return (
    <MDBContainer>
      <CardList zoneInfoObject={tacobellAddresses} />
    </MDBContainer>
  );
  // return <EmbededMaps />;
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

{
  /* {zoneInfo.length > 0 ? (
        <Loader type="Puff" color="#00BFFF" height="100" width="100" />
      ) : (
        <CardList zoneInfoArray={zoneInfo} />
      )} */
}
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
