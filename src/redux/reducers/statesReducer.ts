import {
  FETCH_STATES,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FAILURE,
} from "../actions/statesActions";
import { State } from "../types/statesType";

interface StatesState {
  states: State[];
  loading: boolean;
  error: string | null;
}

const initialState: StatesState = {
  states: [],
  loading: false,
  error: null,
};

const statesReducer = (state = initialState, action: any): StatesState => {
  switch (action.type) {
    case FETCH_STATES:
      return { ...state, loading: true, error: null };
    case FETCH_STATES_SUCCESS:
      return { ...state, states: action.payload.states, loading: false };
    case FETCH_STATES_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    // case ADD_USER:
    //   return { ...state, loading: true, error: null };
    // case ADD_USER_SUCCESS:
    //   return { ...state, users: action.payload.users, loading: false };
    // case ADD_USER_FAILURE:
    //   return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default statesReducer;
