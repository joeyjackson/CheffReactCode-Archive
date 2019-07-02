import React, { useState, useEffect, Fragment } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import IdleTimer from 'react-idle-timer';
import { MDBContainer, MDBRow, MDBCol, MDBFooter, MDBBtn } from 'mdbreact';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { useStateValue } from './StateManagement';
import {
  withAuthenticator,
  AmplifyTheme,
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
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import InventoryTable from './InventoryTable';
import './App.css';
import UserCompletionPage from './UserCompletionPage';

Amplify.configure(awsconfig);

Amplify.configure({
  API: {
    graphql_endpoint: awsconfig.aws_appsync_graphqlEndpoint,
    graphql_endpoint_iam_region: 'us-east-2'
  }
});

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

var scrollIntoView = require('scroll-into-view');

const App = () => {
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
  // tacobellAddresses = {
  //   Tacobell: 'Taco Bell, San Mateo Boulevard Northeast, Albuquerque, NM, USA',
  //   Tacobell2: '3595 Biscayne Blvd, Miami, FL 33137',
  //   McDonalds: '1105 Northside Dr NW, Atlanta, GA 30318'
  // };

  Auth.currentUserInfo().then(data => console.log(data));

  return (
    <Router>
      {/* <IdleTimer
          element={document}
          onActive={() => {
            console.log('user is active');
          }}
          onIdle={() => {
            signOut();
          }}
          debounce={250}
          timeout={30 * 1000 * 60}
        /> */}

      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => {
            {
              /* return (
                <CardList {...routeProps} zoneInfoObject={tacobellAddresses} />
              ); */
            }

            return <UserCompletionPage />;
          }}
        />
        <Route
          path="/location/:location"
          render={linkProps => {
            return (
              <InventoryTable location={linkProps.location.state.location} />
            );
          }}
        />
      </Switch>
      <MDBFooter color="blue" className="font-small pt-4 mt-4">
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="6">
              <h5 className="title">Footer Content</h5>
              <p>
                Here you can use rows and columns here to organize your footer
                content.
              </p>
            </MDBCol>
            <MDBCol md="6">
              <h5 className="title">Links</h5>
              <ul>
                <li className="list-unstyled">
                  <a href="#!">Link 1</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">Link 2</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">Link 3</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">Link 4</a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright:{' '}
            <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
          </MDBContainer>
        </div>
      </MDBFooter>
    </Router>
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
  ],
  theme: AmplifyTheme
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
