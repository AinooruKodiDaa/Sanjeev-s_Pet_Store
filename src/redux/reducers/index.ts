import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import petsReducer from "./petsReducer";
import statesReducer from "./statesReducer";
import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  pets: petsReducer,
  states: statesReducer,
  categories: categoriesReducer
});

export default rootReducer;
