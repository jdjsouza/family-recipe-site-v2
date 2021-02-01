import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// Everything by a specific user
// START GET for browse by creator
function* getAll(action) {
  try {
    const response = yield axios.get(`/api/recipe/`);
    yield put({
      type: 'SET_ALL',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getAllSaga() {
  yield takeLatest('GET_ALL', getAll);
}

export default getAllSaga;
// END GET for browse by creator
