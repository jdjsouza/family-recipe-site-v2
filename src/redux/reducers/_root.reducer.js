import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import recipeDetails from './recipe.details.reducer';
import randomDetails from './random.recipe.reducer';
import theCreators from './browse.by.user.reducer';
import theDishTypes from './browse.dish.types.reducer';
import theDishes from './get.by.dish.reducer';
import byUser from './get.by.user.reducer';
import theUnits from './get.units.reducer';
import theDishList from './get.dish.list.reducer';
import theAccess from './user.access.reducer';
import allRecipes from './all.recipes.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  recipeDetails, // contains all the details to be displayed on details page
  randomDetails, // contains the details from the randomly selected recipe for the home page
  theCreators, // contains the list of people who've created recipes for browsing by
  theDishTypes, // contains the list of types of dishes with recipes associated
  theDishes, // contains the list of recipes by dish type
  byUser, // contains the list of recipes by a specific person
  theUnits, // contains the list of units of measurement
  theDishList, // contains the list of dish types
  theAccess, // contains access levels of users for admin page
  allRecipes,
});

export default rootReducer;
