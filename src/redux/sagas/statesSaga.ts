import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_STATES,
  fetchStatesSuccess,
  fetchStatesFailure,
} from "./../actions/statesActions";

function* fetchStatesSaga(): any {
  try {
    const response = yield call(
      axios.get,
      "http://localhost:3001/states"
    );
    yield put(fetchStatesSuccess(response.data));
  } catch (error: any) {
    yield put(fetchStatesFailure(error.message));
  }
}

export default function* watchStates() {
  yield takeLatest(FETCH_STATES, fetchStatesSaga);
}
