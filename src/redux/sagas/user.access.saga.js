import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAccess(action) {
  try {
    const response = yield axios.get(`/api/user/access`);
    console.log('SAGA', response);
    yield put({
      type: 'SET_ACCESS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getAccessSaga() {
  yield takeLatest('GET_ACCESS', getAccess);
}

export default getAccessSaga;
