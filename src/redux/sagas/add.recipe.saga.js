import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addRecipe(action) {
  try {
    console.log(action.payload);
    yield axios.post(`/api/recipe`, action.payload);
  } catch (err) {
    console.log(err);
  }
}

function* addRecipeSaga() {
  yield takeLatest('ADD_RECIPE', addRecipe);
}

export default addRecipeSaga;
