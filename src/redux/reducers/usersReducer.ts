import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE
} from "../actions/usersActions";
import { User } from "../types/usersTypes";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersReducer = (state = initialState, action: any): UsersState => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload.users, loading: false };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case ADD_USER:
      return { ...state, loading: true, error: null };
    case ADD_USER_SUCCESS:
      return { ...state, users: action.payload.users, loading: false };
    case ADD_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default usersReducer;
