/*
Made code for application. Handles routes for each page. 
1) Gets user info (email, franchise locations - that includes all info we will use)
2) Determines if this is the first time the user logins, if so, render the User Completition page
3) Otherwise, render the locations as cards for the Home Page
*/

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
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
import DecisionPage from './views/DecisionPage';
import NavBar from './components/navigation/NavBar';
import SettingsView from './views/Settings';
import LocationMapListView from './views/LocationMapList';
import CountInventory from './views/CountInventory';
import UserCompletionView from './views/UserCompletion';
import CircularIndeterminate from './components/CircularIndeterminate';

// var scrollIntoView = require('scroll-into-view');

const App = () => {
  const [globalStore, dispatch] = useStateValue();

  // Get user info (email, franchse/locations, suppliers, brands, etc.)
  const getUserInfo = () => {
    Auth.currentUserInfo().then(data => {
      console.log(data);
      const userID = data.attributes.sub;
      API.graphql(
        graphqlOperation(queries.listFranchiseAndLocationss, {
          filter: {
            userID: {
              eq: userID
            }
          }
        })
      )
        .then(result => {
          let franchiseLocations = result.data.listFranchiseAndLocationss.items;
          console.log(franchiseLocations);
          // Set the franchiseLocation for the whole app
          dispatch({
            type: 'franchiseLocations',
            state: franchiseLocations
          });
          // Set the userID for the whole app
          dispatch({
            type: 'userID',
            state: userID
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  // Query user info once the Home Page mounts, MUST keep empty array so we don't continously request on each render
  useEffect(() => {
    dispatch({
      type: 'currentFranchise',
      state: null
    });
    dispatch({
      type: 'currentLocation',
      state: null
    });

    getUserInfo();
  }, []);

  return (
    // Use Router from BrowserRouter to handle linking from/to different pages in application
    <Router>
      <NavBar />
      <Switch>
        {/* If user logged in and has locations, then render the locations. Otherwise, render the User Completion Page */}
        {globalStore.userID ? (
          <Route
            exact
            path="/"
            render={() =>
              globalStore.franchiseLocations.length === 0 ? (
                <UserCompletionView />
              ) : (
                <LocationMapListView />
              )
            }
          />
        ) : (
          // Display loading icon when waiting for User Info API call
          <CircularIndeterminate />
        )}

        {/* This route is executed when a user clicks on a location card, it opens the storage filter page */}
        <Route
          path="/location/options/:location"
          exact
          render={linkProps => <DecisionPage linkProps={linkProps} />}
        />
        {/* When the user is done choosing storage types for the filter, the inventory page is displayed */}
        <Route
          path="/location/options/:location/countInventory"
          exact
          render={linkProps => <CountInventory linkProps={linkProps} />}
        />
        {/* This routes the Settings page that is accessed via the NavBar */}
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
