import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateUser(action) {
  try {
    const response = yield axios.put(`/api/user/update/${action.payload}`);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

function* updateUserSaga() {
  yield takeLatest('APPROVE_USER', updateUser);
}

export default updateUserSaga;
