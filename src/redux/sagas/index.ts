import { StatesState } from "../types/statesType";
import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import usersSaga from "./usersSaga";
import petsSaga from "./petsSaga";
import statesSaga from "./statesSaga";
import categoriesSaga from "./categoriesSaga";


function* rootSaga() {
  yield all([
    authSaga(),
    usersSaga(),
    petsSaga(),
    statesSaga(),
    categoriesSaga()
    
    // Add other sagas here if you have more
  ]);
}

export default rootSaga;
