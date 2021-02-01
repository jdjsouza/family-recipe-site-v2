// Used to store recipe details returned from the server
const recipeDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default recipeDetails;
