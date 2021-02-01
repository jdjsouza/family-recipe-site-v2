import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// GET URL: /api/recipe/dish-types
function* getDishList(action) {
  try {
    const response = yield axios.get(`/api/recipe/dish-types`);
    console.log('SAGA', response);
    yield put({
      type: 'SET_DISH_LIST',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getDishListSaga() {
  yield takeLatest('GET_DISH_LIST', getDishList);
}

export default getDishListSaga;
// END GET for browsing by dish type
