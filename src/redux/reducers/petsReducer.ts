import { Pet } from "./../types/petsTypes";
import {
  FETCH_PETS,
  FETCH_PETS_SUCCESS,
  FETCH_PETS_FAILURE,
  ADD_PET_SUCCESS,
  ADD_PET,
  ADD_PET_FAILURE,
  EDIT_PET,
  EDIT_PET_SUCCESS,
  EDIT_PET_FAILURE,
} from "../actions/petsActions";
import { PetsState } from "../types/petsTypes";

const initialState: PetsState = {
  pets: [],
  loading: false,
  error: null,
};

const petsReducer = (state = initialState, action: any): PetsState => {
  switch (action.type) {
    case FETCH_PETS:
      return { ...state, loading: true, error: null };
    case FETCH_PETS_SUCCESS:
      return { ...state, pets: action.payload.pets, loading: false };
    case FETCH_PETS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case ADD_PET:
      return { ...state, loading: true, error: null };
    case ADD_PET_SUCCESS:
      return {
        ...state,
        // pets: action.payload.pets,
        loading: false,
      };
    case ADD_PET_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case EDIT_PET:
      return { ...state, loading: true, error: null };
    case EDIT_PET_SUCCESS:
      return {
        ...state,
        // pets: action.payload.pets,
        loading: false,
      };
    case EDIT_PET_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default petsReducer;
