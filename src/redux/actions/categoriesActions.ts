import { Category } from "../types/categoriesType";

/**Note: This categories table simulates categories coming from a lookup table, any delete or update of this states table can be done by the admin */
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";


export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const fetchCategoriesSuccess = (categories: Category[]) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { categories },
});

export const fetchCategoriesFailure = (error: string) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error },
});
