import { call, delay, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
} from "../actions/authActions";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import ENDPOINTS from "../../endpoints";

interface AuthObject {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

function* loginSaga(action: any): any {
  try {
    const { username, password } = action.payload;

    const response = yield call(
      axios.get,
      `${ENDPOINTS.loginEndpoint}?username=${username}&password=${password}`
    );

    if (response.data.length === 0) {
      toast.error("Invalid username or password");
      yield put(loginFailure("Invalid username or password"));
    } else {
      sessionStorage.removeItem("user");
      yield delay(250);

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data[0].id,
          username: response.data[0].username,
          firstName: response.data[0].firstName,
          lastName: response.data[0].lastName,
          role: response.data[0].role,
        })
      );

      const userData = JSON.parse(
        sessionStorage.getItem("user") as AuthObject & any
      );

      toast.success("Login Successful!");

      if (userData.role === "admin") {
        setTimeout(() => {
          window.location.href = "/adminDashboard";
        }, 800);
      }

      if (userData.role === "customer") {
        setTimeout(() => {
          window.location.href = "/customerDashboard";
        }, 800);
      }
      yield put(loginSuccess(response.data));
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export default function* watchAuth() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
