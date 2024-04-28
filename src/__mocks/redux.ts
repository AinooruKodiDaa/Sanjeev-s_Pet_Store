import { AnyAction, Observable, Reducer, Store } from "redux";

export const initialState = {};

export const mockDispatch = jest.fn();

export const mockStore: Store<any, AnyAction> = {
  getState: jest.fn(() => initialState),
  dispatch: mockDispatch,
  subscribe: jest.fn(),
  replaceReducer: function (nextReducer: Reducer<any, AnyAction, any>): void {
    throw new Error("Function is not implemented");
  },
  [Symbol.observable]: function (): Observable<any> {
    throw new Error("Function not implemented");
  },
};
