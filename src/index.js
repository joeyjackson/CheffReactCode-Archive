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
  storageOptions: [
    {
      value: 'Dry Goods',
      label: 'Dry Goods'
    },
    {
      value: 'Packaging/Paper/Cleaning',
      label: 'Packaging/Paper/Cleaning'
    },
    {
      value: 'Produce',
      label: 'Produce'
    },
    {
      value: 'Dairy',
      label: 'Dairy'
    },
    {
      value: 'Protein',
      label: 'Protein'
    }
  ],
  unitOptions: [
    {
      value: 'OZ',
      label: 'OZ'
    },
    {
      value: 'LB',
      label: 'LB'
    },
    {
      value: 'CT',
      label: 'CT'
    },
    {
      value: 'GM',
      label: 'GM'
    },
    {
      value: 'AV',
      label: 'AV'
    },
    {
      value: 'GA',
      label: 'GA'
    }
  ],
  supplierOptions: [],
  brandOptions: [],
  storageFilter: {
    dryGoods: false,
    packagingPaperCleaning: false,
    produce: false,
    dairy: false,
    protein: false
  },
  tempSearchAddress: '', // for Google API Search Bar
  selectedFranchise: '',
  selectedAddress: '',
  currentLocation: '',
  currentFranchise: '',
  inventoryTableLoading: true,
  inventoryTableItems: [],
  inventoryItemHasUpdated: false
};

Amplify.configure(awsconfig);

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
