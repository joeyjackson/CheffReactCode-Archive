import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import './assets/scss/mdb.scss';
import Amplify from 'aws-amplify';
import awsconfig from './api/aws-exports.js';
import App from './App';
import { StateProvider, initialState } from './state/StateManagement';
import reducer from './state/reducer';

// optional configuration
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '200px',
  transition: transitions.SCALE
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
