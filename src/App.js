import React, { useState, useEffect, Fragment } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';

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

import CardList from './components/CardList';
import SearchBar from './components/SearchBar';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import InventoryTable from './components/InventoryTable';
import './App.css';
import UserCompletionPage from './components/UserCompletionPage';
import * as queries from './graphql/queries';
import { useStateValue } from './StateManagement';

// var scrollIntoView = require('scroll-into-view');

const App = () => {
  const [globalStore, dispatch] = useStateValue();

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

  // Auth.currentUserInfo().then(data => console.log(data));
  const getUserEmail = () => {
    Auth.currentUserInfo().then(data => {
      const userEmail = data.attributes.email;
      getUserFranchiseLocations(userEmail);
    });
  };

  const getUserFranchiseLocations = userEmail => {
    API.graphql(
      graphqlOperation(queries.listUserLocationss, {
        filter: {
          user: {
            eq: userEmail
          }
        }
      })
    )
      .then(result => {
        dispatch({
          type: 'franchiseLocations',
          state: result.data.listUserLocationss.items
        });
        dispatch({
          type: 'userEmail',
          state: userEmail
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserEmail();
  }, []);

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
        {globalStore.userEmail && (
          <Route
            exact
            path="/"
            render={routeProps => {
              if (globalStore.franchiseLocations.length === 0) {
                return <UserCompletionPage />;
              } else {
                return <CardList />;
              }
            }}
          />
        )}
        <Route
          path="/location/:location"
          render={linkProps => {
            console.log(linkProps);
            return (
              <InventoryTable
                location={linkProps.location.state.location}
                franchise={linkProps.location.state.franchise}
              />
            );
          }}
        />
      </Switch>
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
