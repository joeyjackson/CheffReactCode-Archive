const reducer = (state, action) => {
  switch (action.type) {
    case 'franchiseLocations':
      return {
        ...state,
        franchiseLocations: action.state
      };

    case 'dryStorage':
      return {
        ...state,
        dryStorage: action.state
      };

    case 'coldStorage':
      return {
        ...state,
        coldStorage: action.state
      };

    case 'freezer':
      return {
        ...state,
        freezer: action.state
      };

    case 'lowVelocity':
      return {
        ...state,
        lowVelocity: action.state
      };

    case 'updateRef':
      return {
        ...state,
        cardRef: action.state
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

    default:
      return state;
  }
};

export default reducer;
