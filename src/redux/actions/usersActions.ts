import { User } from "../types/usersTypes";

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const fetchUsersSuccess = (users: User[]) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users },
});

export const fetchUsersFailure = (error: string) => ({
  type: FETCH_USERS_FAILURE,
  payload: { error },
});


///Adda a user///
export const addUser = (body: Omit<User, "id">) => ({
  type: ADD_USER,
  payload: body
});

export const addUserSuccess = (users: User[]) => ({
  type: ADD_USER_SUCCESS,
  payload: { users },
});

export const addUserFailure = (error: string) => ({
  type: ADD_USER_FAILURE,
  payload: { error },
});
///Adda a user///
