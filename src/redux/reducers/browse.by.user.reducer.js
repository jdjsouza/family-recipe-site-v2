// Used to store list of creators from the server
const theCreators = (state = [], action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'SET_CREATORS':
      return action.payload;
    default:
      return state;
  }
};

export default theCreators;
