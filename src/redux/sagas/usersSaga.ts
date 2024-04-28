import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_USER,
  FETCH_USERS,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserSuccess,
  addUserFailure,
} from "../actions/usersActions";
import { toast } from "react-toastify";

function* fetchUsersSaga(): any {
  try {
    const response = yield call(
      axios.get,
      "http://localhost:3001/users"
    );
    yield put(fetchUsersSuccess(response.data));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* addUserSaga(action: any): any {
  try {
    // Get the list of existing users from the state
    const existingUsers = yield select((state) => state.users.users);
    // Check if the username already exists
    const usernameExists = existingUsers.some(
      (user:any) => user.username === action.payload.username
    );
    // If the username already exists, show an error message
    if (usernameExists) {
      toast.error("Username already exists!");
      yield put(addUserFailure("Username already exists"));
    } else {
      // If the username doesn't exist, proceed to add the user
      const response = yield call(
        axios.post,
        "http://localhost:3001/users",
        action.payload
      );
      yield put(addUserSuccess(response.data));
      toast.success("Sign up successful!");
    }
  } catch (error: any) {
    yield put(addUserFailure(error.message));
    toast.error(error.message);
  }
}

export default function* watchUsers() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(ADD_USER, addUserSaga);
}
