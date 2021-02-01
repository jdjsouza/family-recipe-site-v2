import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* delUser(action) {
  try {
    const response = yield axios.delete(`/api/user/del/${action.payload}`);
  } catch (err) {
    console.log(err);
  }
}

function* delUserSaga() {
  yield takeLatest('DELETE_USER', delUser);
}

export default delUserSaga;
