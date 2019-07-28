const reducer = (state, action) => {
  switch (action.type) {
    case 'franchiseLocations':
      return {
        ...state,
        franchiseLocations: action.state
      };

    case 'storageOptions':
      return {
        ...state,
        storageOptions: action.state
      };

    case 'brandOptions':
      return {
        ...state,
        brandOptions: action.state
      };

    case 'itemToRemove':
      return {
        ...state,
        itemToRemove: action.state
      };

    case 'supplierOptions':
      return {
        ...state,
        supplierOptions: action.state
      };

    case 'storageFilter':
      return {
        ...state,
        storageFilter: action.state
      };

    case 'unitOptions':
      return {
        ...state,
        unitOptions: action.state
      };
    case 'currentLocation':
      return {
        ...state,
        currentLocation: action.state
      };
    case 'currentFranchise':
      return {
        ...state,
        currentFranchise: action.state
      };
    case 'inventoryTableItems':
      return {
        ...state,
        inventoryTableItems: action.state
      };
    case 'inventoryItemToUpdate':
      return {
        ...state,
        inventoryItemToUpdate: action.state
      };

    case 'inventoryTableLoading':
      return {
        ...state,
        inventoryTableLoading: action.state
      };
    case 'selectedFranchise':
      return {
        ...state,
        selectedFranchise: action.state
      };

    case 'selectedAddress':
      return {
        ...state,
        selectedAddress: action.state
      };
    case 'tempSearchAddress':
      return {
        ...state,
        tempSearchAddress: action.state
      };
    case 'userID':
      return {
        ...state,
        userID: action.state
      };
    case 'selectedCoordinates':
      return {
        ...state,
        latitude: action.state.lat,
        longitude: action.state.lng
      };

    default:
      return state;
  }
};

export default reducer;
