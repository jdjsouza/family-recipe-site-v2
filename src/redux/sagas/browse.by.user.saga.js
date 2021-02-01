import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// GET All users who've submitted recipes
// START GET for browse creators
function* getUsers(action) {
  try {
    const response = yield axios.get(`/api/recipe/user`);
    yield put({
      type: 'SET_CREATORS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getUsersSaga() {
  yield takeLatest('GET_CREATORS', getUsers);
}

export default getUsersSaga;
// END GET for browse creators
