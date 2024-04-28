import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../sagas'; // Import your root saga
import usersReducer from '../reducers/usersReducer';
import rootReducer from '../reducers';
// // Combine all reducers into a root reducer
// const rootReducer = combineReducers({
//   users: usersReducer,
//   doctors: doctorsReducer,
//   appointments: appointmentsReducer,
// });

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with middleware and enhancers
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
