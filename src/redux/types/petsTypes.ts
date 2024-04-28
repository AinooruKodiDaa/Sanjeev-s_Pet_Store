import { Category } from "./categoriesType";
import { State } from "./statesType";

export interface Pet {
  id?: number;
  name: string;
  age: string | number;
  stateId: string;
  categoryId: string;
  category: Category;
  state: State;
  gender: "Male" | "Female";
  createdAt: Date;
  updatedAt: Date;
}

export interface PetsState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

