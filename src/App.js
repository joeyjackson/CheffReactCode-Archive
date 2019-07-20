import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {
  withAuthenticator,
  AmplifyTheme,
  SignIn,
  ConfirmSignIn,
  TOTPSetup,
  ForgotPassword,
  Loading,
  RequireNewPassword,
  VerifyContact
} from 'aws-amplify-react';
import './App.css';
import * as queries from './api/graphql/queries';
import { useStateValue } from './state/StateManagement';
import StorageFilterStepperView from './views/StorageFilterStepper';
import NavBar from './components/navigation/NavBar';
import SettingsView from './views/Settings';
import LocationMapListView from './views/LocationMapList';
import InventoryTableView from './views/InventoryTable';
import UserCompletionView from './views/UserCompletion';
import CircularIndeterminate from './components/CircularIndeterminate';

// var scrollIntoView = require('scroll-into-view');

const App = () => {
  const [globalStore, dispatch] = useStateValue();

  const getUserInfo = () => {
    Auth.currentUserInfo().then(data => {
      const userEmail = data.attributes.email;
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
          console.log(result);
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
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Router>
      <Switch>
        {globalStore.userEmail ? (
          <Route
            exact
            path="/"
            render={() =>
              globalStore.franchiseLocations.length === 0 ? (
                <UserCompletionView />
              ) : (
                <>
                  <NavBar />
                  <LocationMapListView />
                </>
              )
            }
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularIndeterminate />
          </div>
        )}
        <Route
          path="/location/storageFilter/:location"
          render={linkProps => (
            <StorageFilterStepperView
              location={linkProps.location.state.location}
              franchise={linkProps.location.state.franchise}
            />
          )}
        />
        <Route
          path="/location/inventory/:location"
          render={linkProps => (
            <InventoryTableView
              location={linkProps.location.state.location}
              franchise={linkProps.location.state.franchise}
            />
          )}
        />
        <Route path="/settings" component={SettingsView} />
      </Switch>
    </Router>
  );
};

export default withAuthenticator(App, {
  includeGreetings: true,
  authenticatorComponents: [
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
