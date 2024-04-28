import { Pet } from "../types/petsTypes";

export const FETCH_PETS = "FETCH_PETS";
export const FETCH_PETS_SUCCESS = "FETCH_PETS_SUCCESS";
export const FETCH_PETS_FAILURE = "FETCH_PETS_FAILURE";

export const ADD_PET = "ADD_PET";
export const ADD_PET_SUCCESS = "ADD_PET_SUCCESS";
export const ADD_PET_FAILURE = "ADD_PET_FAILURE";

export const DELETE_PET = "DELETE_PET";
export const DELETE_PET_SUCCESS = "DELETE_PET_SUCCESS";
export const DELETE_PET_FAILURE = "DELETE_PET_FAILURE";

export const EDIT_PET = "EDIT_PET";
export const EDIT_PET_SUCCESS = "EDIT_PET_SUCCESS";
export const EDIT_PET_FAILURE = "EDIT_PET_FAILURE";

///Fetch all pets///
export const fetchPets = () => ({
  type: FETCH_PETS,
});

export const fetchPetsSuccess = (pets: Pet[]) => ({
  type: FETCH_PETS_SUCCESS,
  payload: { pets },
});

export const fetchPetsFailure = (error: string) => ({
  type: FETCH_PETS_FAILURE,
  payload: { error },
});
///Fetch all pets///
///Adda a pet///
export const addPet = (
  body: Omit<Pet, "id" | "createdAt" | "state" |"category" | "updatedAt">
) => ({
  type: ADD_PET,
  payload: body,
});

export const addPetSuccess = (pets: Pet[]) => ({
  type: ADD_PET_SUCCESS,
  payload: { pets },
});

export const addPetFailure = (error: string) => ({
  type: ADD_PET_FAILURE,
  payload: { error },
});
///Adda a pet///

///Delete a pet///
export const deletePet = (petId: string) => ({
  type: DELETE_PET,
  payload: petId,
});

export const deletePetSuccess = (pets: Pet[]) => ({
  type: DELETE_PET_SUCCESS,
  payload: { pets },
});

export const deletePetFailure = (error: string) => ({
  type: DELETE_PET_FAILURE,
  payload: { error },
});
///Delete a pet///
///Edit a pet///
export const editPet = (body: Omit<Pet, "id" | "state">, id: string) => ({
  type: EDIT_PET,
  payload: { body, id },
});

export const editPetSuccess = (pets: Pet[]) => ({
  type: EDIT_PET_SUCCESS,
  payload: { pets },
});

export const editPetFailure = (error: string) => ({
  type: EDIT_PET_FAILURE,
  payload: { error },
});
///Delete a pet///
