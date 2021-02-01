const theAccess = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACCESS':
      return action.payload;
    default:
      return state;
  }
};

export default theAccess;
