// Used to store recipe list by user returned from the server
const byUser = (state = [], action) => {
  switch (action.type) {
    case 'SET_BY_USER':
      return action.payload;
    default:
      return state;
  }
};

export default byUser;
