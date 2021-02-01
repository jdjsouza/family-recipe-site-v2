import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// GET All dish types with a recipe
// START GET for browse dish type
function* getDishTypes(action) {
  try {
    const response = yield axios.get(`/api/recipe/dish`);
    console.log('SAGA', response);
    yield put({
      type: 'SET_DISH_TYPES',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getDishTypesSaga() {
  yield takeLatest('GET_DISH_TYPES', getDishTypes);
}

export default getDishTypesSaga;
// END GET for browse dish type
