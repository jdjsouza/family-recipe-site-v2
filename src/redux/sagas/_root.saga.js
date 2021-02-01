import { all } from 'redux-saga/effects';
import addRecipeSaga from './add.recipe.saga';
import getUsersSaga from './browse.by.user.saga';
import getDishTypesSaga from './browse.dish.types.saga';
import getByDishTypeSaga from './get.by.dish.saga';
import getByUserSaga from './get.by.user.saga';
import getRandomDetailsSaga from './get.random.recipe.saga';
import getRecipeDetailsSaga from './get.recipe.details.saga';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import getUnitsSaga from './get.units.saga';
import getDishList from './get.dish.list.saga';
import getAccessSaga from './user.access.saga';
import delUserSaga from './user.delete.saga';
import updateUserSaga from './user.approve.saga';
import getAllSaga from './all.recipes';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    addRecipeSaga(),
    getRecipeDetailsSaga(),
    getRandomDetailsSaga(),
    getByUserSaga(),
    getUsersSaga(),
    getDishTypesSaga(),
    getByDishTypeSaga(),
    getUnitsSaga(),
    getDishList(),
    getAccessSaga(),
    delUserSaga(),
    updateUserSaga(),
    getAllSaga(),
  ]);
}
