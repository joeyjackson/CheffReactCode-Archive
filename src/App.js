import React, { useState } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import gql from 'graphql-tag';
import Card from './Card';
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
// import { listInventorys } from './graphql/queries';
import Table from './components/tables/editable';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

Amplify.configure(awsconfig);

// Configure a custom GraphQL endpoint
// Amplify.configure({
//   API: {
//     graphql_endpoint: awsconfig.aws_appsync_graphqlEndpoint,
//     graphql_endpoint_iam_region: 'us-east-2'
//   }
// });

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

const NumberList = zoneInfoArray => {
  const cardList = zoneInfoArray.map(location => (
    <MDBCol key={location}>{<Card name={location} />}</MDBCol>
  ));
  return <MDBRow>{cardList}</MDBRow>;
};

const App = props => {
  const initialState = props;
  const [zoneInfo, setZoneInfo] = useState('');

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

  const itemDetails = {
    item: 'apples',
    location: 'tacobell2',
    category: 'freezer'
  };

  // const addItem = () =>
  //   API.graphql(
  //     graphqlOperation(mutations.createInventoryItem, { input: itemDetails })
  //   )
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));

  // addItem();
  Auth.currentUserInfo()
    .then(data => setZoneInfo(data.attributes.zoneinfo))
    .catch(err => console.log(err));

  const zoneInfoArray = zoneInfo.split(',');
  console.log(zoneInfoArray);

  return <MDBContainer>{NumberList(zoneInfoArray)}</MDBContainer>;
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
