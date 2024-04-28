import { call, delay, put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_PETS,
  fetchPetsSuccess,
  fetchPetsFailure,
  addPetSuccess,
  addPetFailure,
  ADD_PET,
  deletePetSuccess,
  deletePetFailure,
  editPet,
  editPetSuccess,
  editPetFailure,
  DELETE_PET,
  EDIT_PET,
} from "../actions/petsActions";
import { toast } from "react-toastify";
import { fetchPetsApi } from "../api";

/**Fetch pets */
function* fetchPetsSaga(): any {
  try {
    const response = yield call(fetchPetsApi);
    // yield delay(500);
    yield put(fetchPetsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchPetsFailure(error.message));
  }
}

/**Add Pet */
function* addPetSaga({ payload }: any): any {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:3001/pets",
      payload
    );
    // yield delay(500);
    yield put(addPetSuccess(response.data));

    toast.success("New pet added successfully!");
  } catch (error: any) {
    yield put(addPetFailure(error.message));
    toast.error(error.message);
  }
}

/**Delete Pet */
function* deletePetSaga({ payload }: any): any {
  try {
    const response = yield call(
      axios.delete,
      `http://localhost:3001/pets/${payload}`
    );
    // yield delay(500);
    yield put(deletePetSuccess(response.data));

    toast.success("Pet deleted successfully!");
  } catch (error: any) {
    yield put(deletePetFailure(error.message));
    toast.error(error.message);
  }
}


/**Delete Pet */
function* editPetSaga({ payload }: any): any {
  try {
    const response = yield call(
      axios.put,
      `http://localhost:3001/pets/${payload.id}`, payload.body
    );
    // yield delay(500);
    yield put(editPetSuccess(response.data));

    toast.success("Edited pet details successfully!");
  } catch (error: any) {
    yield put(editPetFailure(error.message));
    toast.error(error.message);
  }
}


export default function* watchPets() {
  yield takeLatest(FETCH_PETS, fetchPetsSaga);
  yield takeLatest(ADD_PET, addPetSaga);
  yield takeLatest(DELETE_PET, deletePetSaga);
  yield takeLatest(EDIT_PET, editPetSaga);
}
