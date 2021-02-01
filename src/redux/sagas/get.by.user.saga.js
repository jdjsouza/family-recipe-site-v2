import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// Everything by a specific user
// START GET for browse by creator
function* getByUser(action) {
  try {
    const response = yield axios.get(`/api/recipe/user/${action.payload}`);
    yield put({
      type: 'SET_BY_USER',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getByUserSaga() {
  yield takeLatest('GET_BY_USER', getByUser);
}

export default getByUserSaga;
// END GET for browse by creator
