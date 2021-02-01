// Used to store list of units of measurement from the server
const theUnits = (state = [], action) => {
  switch (action.type) {
    case 'SET_UNITS':
      return action.payload;
    default:
      return state;
  }
};

export default theUnits;
