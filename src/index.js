import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './assets/scss/mdb.scss';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { StateProvider } from './StateManagement.js';
import AlertTemplate from 'react-alert-template-basic';
import reducer from './reducer'; // reducer used for global state management
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '200px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

// initial global store
const initialState = {
  franchiseLocations: [], // stores our user's franchise and locations
  dryStorage: false,
  coldStorage: false,
  freezer: false,
  lowVelocity: false,
  tempSearchAddress: '', // for Google API Search Bar
  selectedFranchise: '',
  selectedAddress: ''
};

Amplify.configure(awsconfig);
// API.configure(awsconfig);
// Auth.configure(awsconfig);

// Amplify.configure({
//   Auth: {
//     identityPoolId: awsconfig.aws_cognito_identity_pool_id,
//     region: awsconfig.aws_cognito_region,
//     userPoolId: awsconfig.aws_user_pools_id,
//     userPoolWebClientId: awsconfig.aws_user_pools_web_client_id
//   },
//   API: {
//     graphql_endpoint: awsconfig.aws_appsync_graphqlEndpoint,
//     graphql_endpoint_iam_region: awsconfig.aws_appsync_region,
//     aws_appsync_graphqlEndpoint: awsconfig.aws_appsync_graphqlEndpoint,
//     aws_appsync_region: awsconfig.aws_appsync_region,
//     aws_appsync_authenticationType: awsconfig.aws_appsync_authenticationType
//   }
// });

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </StateProvider>
  </AlertProvider>,
  document.getElementById('root')
);
