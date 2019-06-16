const reducer = (state, action) => {
  switch (action.type) {
    case 'LAT':
      return {
        ...state,
        lat: state.lat
      };

    case 'LNG':
      return {
        ...state,
        lng: state.lng
      };

    default:
      return state;
  }
};

export default reducer;
