import { StatesState } from "./statesType";
import { PetsState } from "./petsTypes";
import { UsersState } from "./usersTypes";
import { CategoriesState } from "./categoriesType";


export interface RootState {
    // auth: AuthState;
    categories: CategoriesState
    users: UsersState;
    pets: PetsState;
    states: StatesState;
    // Add other state slices here if you have more reducers
  }