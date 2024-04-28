import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_CATEGORIES,fetchCategoriesFailure, fetchCategoriesSuccess } from "../actions/categoriesActions";

function* fetchCategoriesSaga(): any {
  try {
    const response = yield call(
      axios.get,
      "http://localhost:3001/categories"
    );
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error: any) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

export default function* watchCategories() {
  yield takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga);
}
