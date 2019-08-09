import React, { createContext, useContext, useReducer } from 'react';

// initial global store
export const initialState = {
  franchiseLocations: [], // stores our user's franchise and locations
  storageOptions: [
    {
      value: 'Dry Storage',
      label: 'Dry Storage'
    },
    {
      value: 'Cold Storage',
      label: 'Cold Storage'
    },
    {
      value: 'Freezer',
      label: 'Freezer'
    },
    {
      value: 'Low Velocity',
      label: 'Low Velocity'
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
  storageFilter: [
    {
      type: 'Dry Storage',
      filtered: false
    },
    {
      type: 'Cold Storage',
      filtered: false
    },
    {
      type: 'Freezer',
      filtered: false
    },
    {
      type: 'Low  Velocity',
      filtered: false
    }
  ],
  tempSearchAddress: '', // for Google API Search Bar
  selectedFranchise: '',
  selectedAddress: '',
  currentLocation: '',
  currentFranchise: '',
  invCountTableLoading: true,
  invCountTableItems: [],
  itemToRemove: ''
};

export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
