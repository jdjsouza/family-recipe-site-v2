import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// GET All recipes by dish types
// START GET for browsing by dish type
function* getByDishType(action) {
  try {
    const response = yield axios.get(`/api/recipe/dish/${action.payload}`);
    yield put({
      type: 'SET_BY_DISH_TYPE',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getByDishTypeSaga() {
  yield takeLatest('GET_BY_DISH_TYPES', getByDishType);
}

export default getByDishTypeSaga;
// END GET for browsing by dish type
