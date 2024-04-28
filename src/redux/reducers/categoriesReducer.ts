import { FETCH_CATEGORIES,FETCH_CATEGORIES_SUCCESS,FETCH_CATEGORIES_FAILURE } from "../actions/categoriesActions";
import { Category } from "../types/categoriesType";



interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesReducer = (state = initialState, action: any): CategoriesState => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload.categories, loading: false };
    case FETCH_CATEGORIES_FAILURE:
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

export default categoriesReducer;
