import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getUnits(action) {
  try {
    const response = yield axios.get(`/api/recipe/units`);
    console.log('SAGA', response);
    yield put({
      type: 'SET_UNITS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getUnitsSaga() {
  yield takeLatest('GET_UNITS', getUnits);
}

export default getUnitsSaga;
// END GET for browsing by dish type
