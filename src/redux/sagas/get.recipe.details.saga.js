import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// START GET for details for Details page
function* getRecipeDetails(action) {
  try {
    const response = yield axios.get(`/api/recipe/details/${action.payload}`);
    yield put({
      type: 'SET_RECIPE_DETAILS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getRecipeDetailsSaga() {
  yield takeLatest('GET_RECIPE_DETAILS', getRecipeDetails);
}

export default getRecipeDetailsSaga;
// END GET for details for Details page
