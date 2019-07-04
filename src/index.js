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
  franchiseLocations: [],
  dryStorage: false,
  coldStorage: false,
  freezer: false,
  lowVelocity: false,
  cardRef: 'root',
  tempSearchAddress: '',
  selectedFranchise: '',
  selectedAddress: ''
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </AlertProvider>,
  document.getElementById('root')
);
