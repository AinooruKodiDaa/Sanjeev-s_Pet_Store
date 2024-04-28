import { State } from "../types/statesType";

/**Note: This states table simulates categories coming from a lookup table, any delete or update of this states table can be done by the admin */
export const FETCH_STATES = "FETCH_STATES";
export const FETCH_STATES_SUCCESS = "FETCH_STATES_SUCCESS";
export const FETCH_STATES_FAILURE = "FETCH_STATES_FAILURE";


export const fetchStates = () => ({
  type: FETCH_STATES,
});

export const fetchStatesSuccess = (states: State[]) => ({
  type: FETCH_STATES_SUCCESS,
  payload: { states },
});

export const fetchStatesFailure = (error: string) => ({
  type: FETCH_STATES_FAILURE,
  payload: { error },
});
