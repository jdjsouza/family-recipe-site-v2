import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// START GET for details for Home page
function* getRandomDetails(action) {
  try {
    const response = yield axios.get(`/api/recipe/random`);
    yield put({
      type: 'SET_RANDOM_DETAILS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getRandomDetailsSaga() {
  yield takeLatest('GET_RANDOM_DETAILS', getRandomDetails);
}

export default getRandomDetailsSaga;
// END GET for details for Home page
