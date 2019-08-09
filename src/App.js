/*
Made code for application. Handles routes for each page. 
1) Gets user info (email, franchise locations - that includes all info we will use)
2) Determines if this is the first time the user logins, if so, render the User Completition page
3) Otherwise, render the locations as cards for the Home Page
*/

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { useStateValue } from './state/StateManagement';
import CircularIndeterminateLoading from './components/CircularIndeterminate';
import NavBar from './components/navigation/NavBar';
import ActionsListView from './views/ActionsList';
import SettingsView from './views/Settings';
import LocationMapListView from './views/LocationMapList';
import AddLocationsView from './views/AddLocations';
import CountInventoryView from './views/actions/CountInventory';
import ReviewInventoryView from './views/actions/ReviewInventory';
import MakeOrderView from './views/actions/MakeOrder';
import ReceiveOrderView from './views/actions/ReceiveOrder';
import { userLocationsPromise, userIDPromise } from './api/api'

const App = () => {
  const [globalStore, dispatch] = useStateValue();

  // Get user info (email, franchse/locations, suppliers, brands, etc.)
  const setUserState = () => {
    userIDPromise().then(userID => {
      dispatch({
        type: 'userID',
        state: userID
      });
      userLocationsPromise(userID)
        .then(result => {
          const franchiseLocations = result.data.listFranchiseAndLocationss.items;
          dispatch({
            type: 'franchiseLocations',
            state: franchiseLocations
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

    setUserState();
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        {/* If user logged in and has locations, then render the locations. Otherwise, render the Add Locations Page */}
        {globalStore.userID ? (
          <Route
            path="/"exact
            render={() => globalStore.franchiseLocations.length === 0 ? (<AddLocationsView />) : (<LocationMapListView />)}
          />
        ) : (
          <CircularIndeterminateLoading />
        )}
        {/* List of actions user can take at a chosen location */}
        <Route
          path="/location/actions/:location" exact
          render={props => <ActionsListView {...props} />}
        />
        {/* Count Inventory Action */}
        <Route
          path="/location/actions/:location/countInventory" exact
          render={props => <CountInventoryView {...props} />}
        />
        {/* Review Inventory Action */}
        <Route
          path="/location/actions/:location/reviewInventory" exact
          render={props => <ReviewInventoryView {...props} />}
        />
        {/* Make Order Action */}
        <Route
          path="/location/actions/:location/makeOrder" exact
          render={props => <MakeOrderView {...props} />}
        />
        {/* Receive Order Action */}
        <Route
          path="/location/actions/:location/receiveOrder" exact
          render={props => <ReceiveOrderView {...props} />}
        />
        {/* Settings */}
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
