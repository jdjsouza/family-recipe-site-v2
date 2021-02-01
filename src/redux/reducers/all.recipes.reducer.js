// Used to store recipe list by user returned from the server
const allRecipes = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL':
      return action.payload;
    default:
      return state;
  }
};

export default allRecipes;
